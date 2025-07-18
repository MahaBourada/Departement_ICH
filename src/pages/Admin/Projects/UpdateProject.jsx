import { useParams } from "react-router-dom";
import {
  ImageField,
  InputField,
  TextAreaField,
} from "../../../components/Inputs.jsx";
import {
  BackButton,
  SmallBorderButton,
  SmallFilledButton,
} from "../../../components/Buttons.jsx";
import { MessagePopup } from "../../../components/MsgPopup.jsx";
import { Plus, Trash2, X } from "lucide-react";
import { useContext, useEffect, useRef, useState } from "react";
import api from "../../../api/api.js";
import { UserContext } from "../../../contexts/UserContext.jsx";

const UpdateProject = () => {
  const currentAdmin = useContext(UserContext).user;
  const { id } = useParams();
  const [project, setProject] = useState({});

  const fetchData = async () => {
    try {
      const response = await api.get(`/projects/${id}`);

      setProject(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const [images, setImages] = useState([
    { ordre_positionnement: 1, path: "", alt_fr: "", alt_en: "" },
    { ordre_positionnement: 2, path: "", alt_fr: "", alt_en: "" },
    { ordre_positionnement: 3, path: "", alt_fr: "", alt_en: "" },
  ]);

  const [membres, setMembres] = useState([{ prenom: "", nom: "" }]);

  const [values, setValues] = useState({});

  useEffect(() => {
    setValues((prev) => ({ ...prev, membres }));
  }, [membres]);

  useEffect(() => {
    if (project) {
      setValues({
        titre: project.titre,
        annee: project.annee,
        objectif_fr: project.objectif_fr,
        objectif_en: project.objectif_en,
      });
      setMembres(project.membres || []);
      // Ensure images array is always length 3
      const imgs = [];
      for (let i = 0; i < 3; i++) {
        imgs[i] =
          project.images && project.images[i]
            ? project.images[i]
            : { path: "", alt_fr: "", alt_en: "", ordre_positionnement: i + 1 };
      }
      setImages(imgs);
    }
  }, [project]);

  const [msg, setMsg] = useState("");
  const [msgShow, setMsgShow] = useState(false);
  const [msgStatus, setMsgStatus] = useState(0);

  const handleClose = () => {
    setMsgShow(false);
  };

  const handleFileChange = (index, e) => {
    if (!e || !e.target || !e.target.files || !e.target.files[0]) return;
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImages((prevImages) => {
        const updated = [...prevImages];
        if (!updated[index]) return updated; // protect against out-of-bounds
        updated[index] = { ...updated[index], path: reader.result };
        return updated;
      });
    };
    reader.readAsDataURL(file);
  };

  const inputRefs = useRef([]);

  const handleRemoveImage = (index) => {
    setImages((prevImages) => {
      const updated = [...prevImages];
      if (!updated[index]) return updated;
      const { idMedia, ...rest } = updated[index];
      updated[index] = {
        ...rest,
        path: "",
        alt_fr: "",
        alt_en: "",
      };
      return updated;
    });

    // Clear the actual file input value
    if (inputRefs.current[index]) {
      inputRefs.current[index].value = "";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      ...values,
      membres: membres,
      images: images,
      currentAdmin: currentAdmin,
    };

    try {
      const response = await api.put(`/projects/${id}`, data);

      setMsgShow(true);
      setMsgStatus(200);
      setMsg(response.data.message);
    } catch (error) {
      const backendMsg = error?.response?.data?.message;
      const backendErrors = error?.response?.data?.errors;

      if (backendErrors && backendErrors.length > 0) {
        // Show only the first error
        setMsg(backendErrors[0].msg);
      } else if (backendMsg) {
        setMsg(backendMsg);
      } else {
        setMsg("Une erreur est survenue.");
      }

      setMsgShow(true);
    }
  };

  const handleReset = () => {
    setValues({
      titre: project.titre,
      annee: project.annee,
      objectif_fr: project.objectif_fr,
      objectif_en: project.objectif_en,
    });

    setImages(project.images);

    setMembres(project.membres);
  };

  return (
    <main className="mx-14 my-20">
      <BackButton />

      <h1 className="text-dynamic-2xl leading-normal font-semibold">
        Gestion du projet '{project.titre}'
      </h1>

      {msgShow && (
        <MessagePopup message={msg} onClose={handleClose} status={msgStatus} />
      )}

      <p className="leading-normal inline-block my-6">
        Veuillez utiliser la syntaxe{" "}
        <strong className="font-semibold">Markdown</strong> pour rédiger la
        saisie de l'objectif.
        <br />
        Voici le lien vers l'aide-mémoire Markdown :&nbsp;
        <a
          className="underline p-0.5 transition-colors duration-300 hover:no-underline hover:bg-hover-main dark:hover:bg-dark-accent rounded-md"
          href="https://www.markdownguide.org/cheat-sheet/"
          title="https://www.markdownguide.org/cheat-sheet/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Markdown Cheat Sheet
        </a>
        <br />
        <strong className="font-semibold">Remarque :</strong> évitez d'utiliser
        le.s symbole.s <code>#</code> pour les titres de
        niveau&nbsp;1,&nbsp;2,&nbsp;3 (heading 1, heading 2, heading 3), car
        cela peut provoquer une erreur d'accessibilité dans la hiérarchie des
        titres du site.
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col m-5">
        <InputField
          isRequired={true}
          type="text"
          label="Titre *"
          name="titre"
          placeholder="Titre du projet"
          value={values.titre}
          onChange={(e) => setValues({ ...values, titre: e.target.value })}
        />

        <InputField
          isRequired={true}
          type="text"
          label="Année *"
          name="annee"
          placeholder="ex. : 2024/2025"
          value={values.annee}
          onChange={(e) => setValues({ ...values, annee: e.target.value })}
        />

        <TextAreaField
          isRequired={true}
          maxLength={500}
          label="Objectif en français *"
          name="objectif_fr"
          placeholder="Mini description du projet en français"
          value={values.objectif_fr}
          onChange={(e) =>
            setValues({ ...values, objectif_fr: e.target.value })
          }
        />

        <TextAreaField
          isRequired={true}
          maxLength={500}
          label="Objectif en anglais *"
          name="objectif_en"
          placeholder="Mini description du projet en anglais"
          value={values.objectif_en}
          onChange={(e) =>
            setValues({ ...values, objectif_en: e.target.value })
          }
        />

        <p className="font-medium font-main my-4">Ajout des membres</p>

        {membres.map((membre, index) => (
          <div key={index}>
            <div className="flex items-center justify-between">
              <p className="font-medium font-main">Membre {index + 1}</p>

              <button
                type="button"
                onClick={() => {
                  setMembres((prev) => prev.filter((_, idx) => idx !== index));
                }}
                className="cursor-pointer p-0.5 rounded-md transition-colors duration-300 hover:bg-neutral-300 dark:hover:bg-neutral-600"
              >
                <Trash2
                  aria-label="Supprimer un membre du projet"
                  size={30}
                  className="text-[#8B0000] dark:text-red-400"
                  strokeWidth={2}
                />
              </button>
            </div>

            <div className="flex items-start justify-between mb-3">
              <div className="flex flex-col w-1/2 mr-2">
                <InputField
                  isRequired={membres.length > 0}
                  type="text"
                  label="Prénom *"
                  placeholder={`Prénom du membre ${index + 1}`}
                  name={`prenom${index + 1}`}
                  value={membre.prenom}
                  onChange={(e) =>
                    setMembres((prev) => {
                      const updated = [...prev];
                      updated[index] = {
                        ...updated[index],
                        prenom: e.target.value,
                      };
                      return updated;
                    })
                  }
                />
              </div>

              <div className="flex flex-col w-1/2 ml-2">
                <InputField
                  isRequired={membres.length > 0}
                  type="text"
                  label="Nom *"
                  name={`nom${index + 1}`}
                  placeholder={`Nom du membre ${index + 1}`}
                  value={membre.nom}
                  onChange={(e) =>
                    setMembres((prev) => {
                      const updated = [...prev];
                      updated[index] = {
                        ...updated[index],
                        nom: e.target.value,
                      };
                      return updated;
                    })
                  }
                />
              </div>
            </div>
          </div>
        ))}

        <div className="my-4 flex items-center justify-end">
          <button
            type="button"
            onClick={() => {
              if (membres.length < 5) {
                setMembres((prev) => [...prev, { prenom: "", nom: "" }]);
              }
            }}
            disabled={membres.length >= 5}
            className={`flex items-center border-2 text-black dark:text-dark-white border-black dark:border-dark-white font-main font-medium rounded-xl h-fit px-5 py-2.5 mx-2 my-1 transition-colors duration-300 hover:bg-neutral-300 dark:hover:bg-neutral-600 max-md:w-42 max-md:mx-3 text-nav leading-normal
                      ${
                        membres.length >= 5
                          ? "cursor-not-allowed opacity-75"
                          : "cursor-pointer transition-colors duration-300 hover:bg-neutral-300"
                      }`}
          >
            {membres.length >= 5 ? (
              <X
                aria-label="Nombre maximal de membres atteint"
                size={32}
                className="text-[#232323] dark:text-gray-300 mr-2"
                strokeWidth={2.8}
              />
            ) : (
              <Plus
                aria-label="Ajouter un membre au projet"
                size={32}
                className="text-[#232323] dark:text-gray-300 mr-2"
                strokeWidth={2.8}
              />
            )}
            <p>
              {membres.length >= 5
                ? "Vous ne pouvez pas ajouter plus de 5 membres."
                : "Ajouter un membre au projet"}
            </p>
          </button>
        </div>

        {images.map((img, i) => (
          <div key={i}>
            <ImageField
              text={`Image ${i + 1}`}
              name={`imagePage${i + 1}`}
              alt={`Image ${i + 1}`}
              file={
                img.path.startsWith("data:image")
                  ? img.path
                  : `${import.meta.env.VITE_BASE_URL}/${img.path}`
              }
              onChange={(e) => handleFileChange(i, e)}
              onRemove={() => handleRemoveImage(i)}
              inputRef={(el) => (inputRefs.current[i] = el)}
            />
            <InputField
              type="text"
              label="Alt en français"
              placeholder="Texte ALT FR"
              name={`alt_fr_${i}`}
              value={img.alt_fr}
              onChange={(e) =>
                setImages((prev) => {
                  const updated = [...prev];
                  updated[i] = { ...updated[i], alt_fr: e.target.value };
                  return updated;
                })
              }
            />
            <InputField
              type="text"
              label="Alt en anglais"
              placeholder="Texte ALT EN"
              name={`alt_en_${i}`}
              value={img.alt_en}
              onChange={(e) =>
                setImages((prev) => {
                  const updated = [...prev];
                  updated[i] = { ...updated[i], alt_en: e.target.value };
                  return updated;
                })
              }
            />
          </div>
        ))}

        <div className="flex justify-end mt-3">
          <SmallBorderButton
            type="button"
            text="Réinitialiser"
            onClick={handleReset}
          />

          <SmallFilledButton type="submit" text="Modifier" />
        </div>
      </form>
    </main>
  );
};

export default UpdateProject;
