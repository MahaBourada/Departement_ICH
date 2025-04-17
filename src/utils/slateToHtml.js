import { Editor, Element as SlateElement } from "slate";

export const serializeToHtml = (pagesList, position) => {
  const page = pagesList.find(
    (section) => section.ordre_positionnement === position
  );

  if (!page || !page.texte) return "";

  let parsedText;
  try {
    parsedText = JSON.parse(page.texte);
  } catch (error) {
    console.error("Invalid JSON in texte:", error);
    return "";
  }

  const serializeToHtml = (nodes) => {
    return nodes
      .map((node) => {
        if (Editor.isEditor(node)) return serializeToHtml(node.children);

        if (SlateElement.isElement(node)) {
          const children = serializeToHtml(node.children);
          const style = node.align ? `style="text-align: ${node.align}"` : "";

          switch (node.type) {
            case "block-quote":
              return `<blockquote ${style}>${children}</blockquote>`;
            case "bulleted-list":
              return `<ul ${style}>${children}</ul>`;
            case "heading-one":
              return `<h1 ${style}>${children}</h1>`;
            case "heading-two":
              return `<h2 ${style}>${children}</h2>`;
            case "list-item":
              return `<li ${style}>${children}</li>`;
            case "numbered-list":
              return `<ol ${style}>${children}</ol>`;
            default:
              return `<p ${style}>${children}</p>`;
          }
        }

        let text = node.text;
        if (node.bold)
          text = `<strong>${text}</strong>`;
        if (node.italic) text = `<em>${text}</em>`;
        if (node.underline) text = `<u>${text}</u>`;
        if (node.code) text = `<code>${text}</code>`;

        return text;
      })
      .join("");
  };

  return serializeToHtml(parsedText);
};
