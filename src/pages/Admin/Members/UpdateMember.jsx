import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../../api/api";
import { MessagePopup } from "../../../components/MsgPopup";
import {
  ImageField,
  InputField,
  SelectField,
  TextAreaField,
} from "../../../components/Inputs";
import {
  SmallBorderButton,
  SmallFilledButton,
} from "../../../components/Buttons";
import { getRelativePath } from "../../../utils/getRelativePath";
import { UserContext } from "../../../contexts/UserContext";

const UpdateMember = () => {
  const currentAdmin = useContext(UserContext).user;
  const { id } = useParams();
  const [member, setMember] = useState({});

  const fetchData = async () => {
    try {
      const response = await api.get(`/members/${id}`);
      setMember(response.data);
      setImage(response.data.image);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (member?.idMembre) {
      const initialImage = member.image
        ? `${import.meta.env.VITE_BASE_URL}/${member.image}`
        : member.image || null;

      console.log(initialImage);

      setValues({
        prenom: member.prenom || "",
        nom: member.nom || "",
        titre: member.titre || "",
        fonction_fr: member.fonction_fr || "",
        fonction_en: member.fonction_en || "",
        section_fr: member.section_fr || "",
        section_en: member.section_en || "",
        propos_fr: member.propos_fr || "",
        propos_en: member.propos_en || "",
        image: member.image || "",
      });
      setImage(initialImage);
    }
  }, [member]);

  const [image, setImage] = useState();

  const handleChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result); // this is the base64 string like 'data:image/png;base64,...'
        /* setValues((prev) => ({
          ...prev,
          image: reader.result, // store base64 string in your form state
        })); */
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleRemoveImage = () => {
    setImage("");
  };

  const [values, setValues] = useState({
    prenom: member?.prenom || "",
    nom: member?.nom || "",
    titre: member?.titre || "",
    fonction_fr: member?.fonction_fr || "",
    fonction_en: member?.fonction_en || "",
    section_fr: member?.section_fr || "",
    section_en: member?.section_en || "",
    propos_fr: member?.propos_fr || "",
    propos_en: member?.propos_en || "",
    image: member?.image || "",
  });

  const [msg, setMsg] = useState("");
  const [msgShow, setMsgShow] = useState(false);
  const [msgStatus, setMsgStatus] = useState(0);

  const handleClose = () => {
    setMsgShow(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      ...values,
      image: getRelativePath(image),
      currentAdmin: currentAdmin,
    };

    try {
      const response = await api.put(`/members/${member.idMembre}`, data);

      setMsgShow(true);
      setMsgStatus(200);
      setMsg(response.data.message);
    } catch (error) {
      console.error(error);
    }
  };

  const handleReset = () => {
    setValues({
      prenom: member.prenom || "",
      nom: member.nom || "",
      titre: member.titre || "",
      fonction_fr: member.fonction_fr || "",
      fonction_en: member.fonction_en || "",
      section_fr: member.section_fr || "",
      section_en: member.section_en || "",
      propos_fr: member.propos_fr || "",
      propos_en: member.propos_en || "",
      image: member.image || "",
    });
    handleRemoveImage();
  };

  return (
    <main className="mx-14 my-20">
      <h1 className="text-display font-semibold">
        Gestion du membre {member.prenom + " " + member.nom}
      </h1>

      {msgShow && (
        <MessagePopup message={msg} onClose={handleClose} status={msgStatus} />
      )}

      <form onSubmit={handleSubmit} className="flex flex-col m-5">
        <div className="flex items-start justify-between mb-3">
          <div className="flex flex-col w-1/2 mr-2">
            <InputField
              isRequired={true}
              type="text"
              label="Prénom *"
              name="prenom"
              placeholder="Jane"
              value={values.prenom}
              onChange={(e) => setValues({ ...values, prenom: e.target.value })}
            />
          </div>

          <div className="flex flex-col w-1/2 ml-2">
            <InputField
              isRequired={true}
              type="text"
              label="Nom *"
              name="nom"
              placeholder="DOE"
              value={values.nom}
              onChange={(e) => setValues({ ...values, nom: e.target.value })}
            />
          </div>
        </div>

        <ImageField
          text="Image"
          name="imageMembre"
          alt={`Image de ${member.prenom + " " + member.nom}`}
          file={image}
          onChange={handleChange}
          onRemove={handleRemoveImage}
        />

        <p
          id="fonction-section-note"
          className="text-gray-800 dark:text-dark-white mb-2"
        >
          Le champ <strong>Fonction</strong> est obligatoire uniquement si le
          titre est <em>Directeur du département</em> ou <em>Enseignant(e)</em>.
        </p>

        <SelectField
          isRequired={true}
          label="Titre *"
          placeholder="Selectionez un titre"
          name="titre"
          value={values.titre}
          onChange={(e) => setValues({ ...values, titre: e.target.value })}
          values={[
            "Directeur du département",
            "Administration",
            "Enseignant(e)",
          ]}
        />

        <div className="flex items-start justify-between mb-3">
          <div className="flex flex-col w-1/2 mr-2">
            <InputField
              isRequired={
                values.titre === "Directeur du département" ||
                values.titre === "Enseignant(e)"
              }
              type="text"
              label="Fonction en français"
              name="fonction_fr"
              placeholder="ex : Maître de conférences"
              value={values.fonction_fr}
              onChange={(e) =>
                setValues({ ...values, fonction_fr: e.target.value })
              }
              aria-describedby="fonction-section-note"
            />
          </div>

          <div className="flex flex-col w-1/2 ml-2">
            <InputField
              isRequired={
                values.titre === "Directeur du département" ||
                values.titre === "Enseignant(e)" ||
                values.fonction_fr
              }
              type="text"
              label="Fonction en anglais"
              name="fonction_en"
              placeholder="ex : Associate Professor"
              value={values.fonction_en}
              onChange={(e) =>
                setValues({ ...values, fonction_en: e.target.value })
              }
              aria-describedby="fonction-section-note"
            />
          </div>
        </div>

        <InputField
          type="text"
          label="Section disciplinaire en français"
          name="section_fr"
          placeholder="ex : 61e section (CNU) : Génie informatique, Automatique, Traitement du signal"
          value={values.section_fr}
          onChange={(e) => setValues({ ...values, section_fr: e.target.value })}
          aria-describedby="fonction-section-note"
        />
        <InputField
          isRequired={values.section_fr}
          type="text"
          label="Section disciplinaire en anglais"
          name="section_en"
          placeholder="ex : 61st section (CNU): Computer engineering, automation, signal processing"
          value={values.section_en}
          onChange={(e) => setValues({ ...values, section_en: e.target.value })}
          aria-describedby="fonction-section-note"
        />

        <p className="leading-normal inline-block m-3">
          Veuillez utiliser la syntaxe{" "}
          <strong className="font-semibold">Markdown</strong> pour rédiger le "à
          propos".
          <br />
          Voici le lien vers l'aide-mémoire Markdown :&nbsp;
          <a
            className="underline p-0.5 hover:no-underline hover:bg-hover-main dark:hover:bg-dark-accent rounded-md"
            href="https://www.markdownguide.org/cheat-sheet/"
            title="https://www.markdownguide.org/cheat-sheet/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Markdown Cheat Sheet
          </a>
          <br />
          <strong className="font-semibold">Remarque :</strong> évitez
          d'utiliser le.s symbole.s <code>#</code> pour les titres de
          niveau&nbsp;1,&nbsp;2,&nbsp;3,&nbsp;4 (heading 1, heading 2, heading
          3, heading 4), car cela peut provoquer une erreur d'accessibilité dans
          la hiérarchie des titres du site.
        </p>

        <TextAreaField
          label="A propos en français"
          name="propos_fr"
          placeholder="Mini description du membre en français"
          value={values.propos_fr}
          maxLength={500}
          onChange={(e) => setValues({ ...values, propos_fr: e.target.value })}
        />

        <TextAreaField
          isRequired={values.propos_fr}
          label="A propos en anglais"
          name="propos_en"
          placeholder="Mini description du membre en anglais"
          value={values.propos_en}
          maxLength={500}
          onChange={(e) => setValues({ ...values, propos_en: e.target.value })}
        />

        <div className="flex justify-end mt-3">
          <SmallBorderButton
            type="button"
            onClick={handleReset}
            text="Réinitialiser"
          />

          <SmallFilledButton type="submit" text="Modifier" />
        </div>
      </form>
    </main>
  );
};

export default UpdateMember;
