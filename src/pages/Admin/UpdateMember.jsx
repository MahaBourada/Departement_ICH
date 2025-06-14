import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api/api";
import MessagePopup from "../../components/MsgPopup";
import {
  ImageField,
  InputField,
  SelectField,
  TextAreaField,
} from "../../components/Inputs";
import { SmallBorderButton, SmallFilledButton } from "../../components/Buttons";

const UpdateMember = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [member, setMember] = useState({});

  const fetchData = async () => {
    try {
      const response = await api.get(`/members/${id}`);
      setMember(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (member?.idMembre) {
      const initialImage =
        member.image_blob && !member.image_blob.startsWith("data:image")
          ? `${import.meta.env.VITE_BASE_URL}/${member.image_blob}`
          : member.image_blob || null;

      setValues({
        prenom: member.prenom || "",
        nom: member.nom || "",
        titre: member.titre || "",
        fonction: member.fonction || "",
        section: member.section || "",
        propos: member.propos || "",
        image_blob: member.image_blob || "",
      });
      setFile(initialImage);
    }
  }, [member]);

  const [file, setFile] = useState();

  const handleChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFile(reader.result); // this is the base64 string like 'data:image/png;base64,...'
        setValues((prev) => ({
          ...prev,
          image_blob: reader.result, // store base64 string in your form state
        }));
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const [values, setValues] = useState({
    prenom: member?.prenom || "",
    nom: member?.nom || "",
    titre: member?.titre || "",
    fonction: member?.fonction || "",
    section: member?.section || "",
    propos: member?.propos || "",
    image_blob: file || "",
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
          text="Image *"
          name="imageMembre"
          alt={`Image de ${member.prenom + " " + member.nom}`}
          file={file}
          onChange={handleChange}
        />

        <div className="flex items-start justify-between mb-3">
          <SelectField
            label="Titre *"
            placeholder="Selectionez un titre"
            name="titre"
            onChange={(e) => setValues({ ...values, titre: e.target.value })}
            initialValue={values.titre}
            values={[
              "Directeur du département",
              "Administration",
              "Enseignant(e)",
            ]}
          />

          <div className="flex flex-col w-1/2 ml-2">
            <InputField
              type="text"
              label="Fonction *"
              name="fonction"
              placeholder="ex : Maître de conférences"
              value={values.fonction}
              onChange={(e) =>
                setValues({ ...values, fonction: e.target.value })
              }
            />
          </div>
        </div>

        <div className="flex flex-col mb-3">
          <InputField
            type="text"
            label="Section disciplinaire *"
            name="section"
            placeholder="ex : 61e section (Génie informatique, Automatique, Traitement du signal)"
            value={values.section}
            onChange={(e) => setValues({ ...values, section: e.target.value })}
          />
        </div>

        <TextAreaField
          label="A propos"
          name="propos"
          placeholder="Mini description du membre"
          value={values.propos}
          onChange={(e) => setValues({ ...values, propos: e.target.value })}
        />

        <div className="flex justify-end mt-3">
          <SmallBorderButton
            type="reset"
            bgColor="bg-white"
            color="text-black"
            borderColor="border-black"
            text="Réinitialiser"
          />

          <SmallFilledButton
            type="submit"
            bgColor="bg-accent"
            color="text-black"
            text="Modifier"
          />
        </div>
      </form>
    </main>
  );
};

export default UpdateMember;
