import isHotkey from "is-hotkey";
import React, { useCallback, useMemo } from "react";
import {
  Editor,
  Element as SlateElement,
  Transforms,
  createEditor,
} from "slate";
import { withHistory } from "slate-history";
import { Editable, Slate, useSlate, withReact } from "slate-react";
import { Button, Icon, Toolbar } from "../components/RichToolbar";
import {
  Bold,
  Italic,
  Underline,
  Code,
  Quote,
  ListOrdered,
  List,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Heading1,
  Heading2,
} from "lucide-react";

const HOTKEYS = {
  "mod+b": "bold",
  "mod+i": "italic",
  "mod+u": "underline",
  "mod+`": "code",
};
const LIST_TYPES = ["numbered-list", "bulleted-list"];
const TEXT_ALIGN_TYPES = ["left", "center", "right", "justify"];

const RichTextEditor = ({ value, onChange }) => {
  const renderElement = useCallback((props) => <Element {...props} />, []);
  const renderLeaf = useCallback((props) => <Leaf {...props} />, []);
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);

  return (
    <Slate
      editor={editor}
      initialValue={value ? value : initialValue}
      onChange={(newValue) => {
        onChange(newValue);
      }}
    >
      <div
        className="bg-gray-100 border-gray-200 border-2 rounded-xl px-5 py-[0.85rem] my-4 mr-2 outline-gray-500 text-dynamic-body leading-10 text-gray-800 dark:text-black"
        aria-label="Éditeur de texte enrichi"
      >
        <Toolbar aria-label="Barre d'outils de l'éditeur">
          <MarkButton format="bold" icon={<Bold size={19} />} />
          <MarkButton format="italic" icon={<Italic size={19} />} />
          <MarkButton format="underline" icon={<Underline size={19} />} />
          <MarkButton format="code" icon={<Code size={19} />} />
          {/* <BlockButton format="heading-one" icon={<Heading1 size={19} />} /> */}
          <BlockButton format="heading-two" icon={<Heading2 size={19} />} />
          <BlockButton format="block-quote" icon={<Quote size={19} />} />
          <BlockButton
            format="numbered-list"
            icon={<ListOrdered size={19} />}
          />
          <BlockButton format="bulleted-list" icon={<List size={19} />} />
          <BlockButton format="left" icon={<AlignLeft size={19} />} />
          <BlockButton format="center" icon={<AlignCenter size={19} />} />
          <BlockButton format="right" icon={<AlignRight size={19} />} />
          <BlockButton format="justify" icon={<AlignJustify size={19} />} />
        </Toolbar>
        <Editable
          aria-label="Zone de saisie de texte"
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          placeholder="Veuillez entrer votre texte..."
          spellCheck
          onKeyDown={(event) => {
            for (const hotkey in HOTKEYS) {
              if (isHotkey(hotkey, event)) {
                event.preventDefault();
                const mark = HOTKEYS[hotkey];
                toggleMark(editor, mark);
              }
            }
          }}
        />
      </div>
    </Slate>
  );
};
const toggleBlock = (editor, format) => {
  const isActive = isBlockActive(
    editor,
    format,
    isAlignType(format) ? "align" : "type"
  );
  const isList = isListType(format);
  Transforms.unwrapNodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) &&
      SlateElement.isElement(n) &&
      isListType(n.type) &&
      !isAlignType(format),
    split: true,
  });
  let newProperties;
  if (isAlignType(format)) {
    newProperties = {
      align: isActive ? undefined : format,
    };
  } else {
    newProperties = {
      type: isActive ? "paragraph" : isList ? "list-item" : format,
    };
  }
  Transforms.setNodes(editor, newProperties);
  if (!isActive && isList) {
    const block = { type: format, children: [] };
    Transforms.wrapNodes(editor, block);
  }
};
const toggleMark = (editor, format) => {
  const isActive = isMarkActive(editor, format);
  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};
const isBlockActive = (editor, format, blockType = "type") => {
  const { selection } = editor;
  if (!selection) return false;
  const [match] = Array.from(
    Editor.nodes(editor, {
      at: Editor.unhangRange(editor, selection),
      match: (n) => {
        if (!Editor.isEditor(n) && SlateElement.isElement(n)) {
          if (blockType === "align" && isAlignElement(n)) {
            return n.align === format;
          }
          return n.type === format;
        }
        return false;
      },
    })
  );
  return !!match;
};
const isMarkActive = (editor, format) => {
  const marks = Editor.marks(editor);
  return marks ? marks[format] === true : false;
};
const Element = ({ attributes, children, element }) => {
  const style = {};
  if (isAlignElement(element)) {
    style.textAlign = element.align;
  }
  switch (element.type) {
    case "block-quote":
      return (
        <blockquote
          className="border-l-4 border-gray-400 pl-4 italic text-gray-600 my-2"
          {...attributes}
        >
          {children}
        </blockquote>
      );
    case "bulleted-list":
      return (
        <ul className="list-disc mx-6" {...attributes}>
          {children}
        </ul>
      );
    /* case "heading-one":
      return (
        <h1 className="text-2xl font-semibold my-2" {...attributes}>
          {children}
        </h1>
      ); */
    case "heading-two":
      return (
        <h2 className="text-[2rem] font-medium" {...attributes}>
          {children}
        </h2>
      );
    case "list-item":
      return (
        <li style={style} {...attributes}>
          {children}
        </li>
      );
    case "numbered-list":
      return (
        <ol className="list-decimal mx-6" {...attributes}>
          {children}
        </ol>
      );
    default:
      return (
        <p style={style} {...attributes}>
          {children}
        </p>
      );
  }
};
const Leaf = ({ attributes, children, leaf }) => {
  if (leaf.bold) {
    children = <strong className="font-semibold">{children}</strong>;
  }
  if (leaf.code) {
    children = <code className="bg-gray-300 px-1 rounded">{children}</code>;
  }
  if (leaf.italic) {
    children = <em>{children}</em>;
  }
  if (leaf.underline) {
    children = <u>{children}</u>;
  }
  return <span {...attributes}>{children}</span>;
};
const BlockButton = ({ format, icon }) => {
  const editor = useSlate();
  return (
    <Button
      active={isBlockActive(
        editor,
        format,
        isAlignType(format) ? "align" : "type"
      )}
      onMouseDown={(event) => {
        event.preventDefault();
        toggleBlock(editor, format);
      }}
    >
      <Icon>{icon}</Icon>
    </Button>
  );
};
const MarkButton = ({ format, icon }) => {
  const editor = useSlate();
  return (
    <Button
      active={isMarkActive(editor, format)}
      onMouseDown={(event) => {
        event.preventDefault();
        toggleMark(editor, format);
      }}
    >
      <Icon>{icon}</Icon>
    </Button>
  );
};
const isAlignType = (format) => {
  return TEXT_ALIGN_TYPES.includes(format);
};
const isListType = (format) => {
  return LIST_TYPES.includes(format);
};
const isAlignElement = (element) => {
  return "align" in element;
};
const initialValue = [
  {
    type: "paragraph",
    children: [{ text: "" }],
  },
];
export default RichTextEditor;
