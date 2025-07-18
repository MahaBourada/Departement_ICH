import { useContext, useEffect, useState } from "react";
import api from "../../../api/api.js";
import { MessagePopup } from "../../../components/MsgPopup.jsx";
import { InputField, SelectField } from "../../../components/Inputs.jsx";
import {
  BackButton,
  SmallBorderButton,
  SmallFilledButton,
} from "../../../components/Buttons.jsx";
import Switch from "@mui/material/Switch";
import { Link, useParams } from "react-router-dom";
import { UserContext } from "../../../contexts/UserContext.jsx";
import { CircleArrowLeft } from "lucide-react";

const UpdateAdmin = () => {
  const currentAdmin = useContext(UserContext).user;
  const { id } = useParams();
  const [admin, setAdmin] = useState({});
  const [values, setValues] = useState({
    firstname: "",
    lastname: "",
    email: "",
    username: "",
    regpass: false,
  });

  const [msg, setMsg] = useState("");
  const [msgShow, setMsgShow] = useState(false);
  const [msgStatus, setMsgStatus] = useState(0);

  const handleClose = () => {
    setMsgShow(false);
  };

  const fetchData = async () => {
    try {
      const response = await api.get(`/admin/${id}`);

      setAdmin(response.data);
    } catch (error) {
      setMsgShow(true);
      setMsgStatus(0);
      setMsg(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (admin?.idAdmin) {
      setValues({
        firstname: admin.firstname || "",
        lastname: admin.lastname || "",
        email: admin.email || "",
        username: admin.username || "",
        regpass: false,
      });
    }
  }, [admin]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      ...values,
      currentAdmin: currentAdmin,
    };

    try {
      const response = await api.put(`/admin/${id}`, data);

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
      firstname: admin.firstname || "",
      lastname: admin.lastname || "",
      email: admin.email || "",
      regpass: false,
    });
  };

  return (
    <main className="mx-14 my-20">
      <BackButton />

      <h1 className="text-display font-semibold leading-normal">
        Gestion de l'administrateur '{admin.firstname}{" "}
        {admin.lastname?.toUpperCase()} ({admin.username})'
      </h1>

      {msgShow && (
        <MessagePopup message={msg} onClose={handleClose} status={msgStatus} />
      )}

      <form onSubmit={handleSubmit} className="flex flex-col m-5">
        <div className="flex items-start justify-between">
          <div className="flex flex-col w-1/2 mr-3">
            <InputField
              isRequired={true}
              type="text"
              label="Prénom *"
              name="firstname"
              placeholder="Jane"
              value={values.firstname}
              onChange={(e) =>
                setValues({ ...values, firstname: e.target.value })
              }
            />
          </div>

          <div className="flex flex-col w-1/2">
            <InputField
              isRequired={true}
              type="text"
              label="Nom *"
              name="lastname"
              placeholder="DOE"
              value={values.lastname}
              onChange={(e) =>
                setValues({ ...values, lastname: e.target.value })
              }
            />
          </div>
        </div>

        <InputField
          isRequired={true}
          type="email"
          label="E-mail *"
          name="email"
          placeholder="example@mail.com"
          value={values.email}
          onChange={(e) => setValues({ ...values, email: e.target.value })}
        />

        <div className="w-1/2 mr-3 leading-normal my-4">
          <div className="flex flex-row items-center justify-between my-2">
            <label
              id="etiquette-switch-mdp"
              htmlFor="switch-mdp"
              className="font-main font-medium"
            >
              Régénérer le mot de passe
            </label>

            <Switch
              id="switch-mdp"
              checked={values.regpass}
              onChange={(e) =>
                setValues({ ...values, regpass: e.target.checked })
              }
              size="medium"
              inputProps={{
                "aria-labelledby": "etiquette-switch-mdp",
                "aria-describedby": "switch-mdp-desc",
                role: "switch",
              }}
            />
          </div>

          <p
            id="switch-mdp-desc"
            className="text-gray-800 dark:text-dark-white my-1 mx-2"
          >
            Activez pour générer automatiquement un nouveau mot de passe
            temporaire.
          </p>
        </div>

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

export default UpdateAdmin;
