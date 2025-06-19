import { useEffect, useState } from "react";
import api from "../../api/api.js";
import MessagePopup from "../../components/MsgPopup.jsx";
import { InputField, SelectField } from "../../components/Inputs.jsx";
import {
  SmallBorderButton,
  SmallFilledButton,
} from "../../components/Buttons.jsx";
import Switch from "@mui/material/Switch";
import { useParams } from "react-router-dom";

const UpdateAdmin = () => {
  const { id } = useParams();
  const [values, setValues] = useState({
    firstname: "",
    lastname: "",
    email: "",
    username: "",
    role: "",
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

      setValues({
        ...response.data,
        regpass: false,
      });
    } catch (error) {
      setMsgShow(true);
      setMsgStatus(0);
      setMsg(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !values.firstname ||
      !values.lastname ||
      !values.username ||
      !values.email ||
      !values.role
    ) {
      setMsg("Tous les champs sont obligatoires.");
      setMsgShow(true);
      return;
    }

    const { createdAt, username, ...data } = values;

    try {
      const response = await api.put(`/admin/${id}`, data);

      setMsgShow(true);
      setMsgStatus(200);
      setMsg(response.data.message);
    } catch (error) {
      const backendMsg = error?.response?.data?.message;

      if (backendMsg) {
        setMsg(backendMsg); // Set the backend message from Express
        setMsgShow(true); // Trigger your popup or message display
      }
    }
  };

  return (
    <main className="mx-14 my-20">
      <h1 className="text-display font-semibold ">
        Gestion de l'administrateur {values.firstname}{" "}
        {values.lastname.toUpperCase()} ({values.username})
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

        <div className="flex items-start justify-between">
          <div className="flex flex-col w-1/2 mr-3">
            <InputField
              isRequired={true}
              type="email"
              label="E-mail *"
              name="email"
              placeholder="example@mail.com"
              value={values.email}
              onChange={(e) => setValues({ ...values, email: e.target.value })}
            />
          </div>

          <div className="flex flex-col w-1/2">
            <SelectField
              isRequired={true}
              label="Rôle *"
              placeholder="Sélectionnez une option"
              name="role"
              initialValue={values.role}
              onChange={(e) => setValues({ ...values, role: e.target.value })}
              values={["Super admin", "Admin"]}
            />
          </div>
        </div>

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

          <p id="switch-mdp-desc" className="text-gray-800 my-1 mx-2">
            Activez pour générer automatiquement un nouveau mot de passe
            temporaire.
          </p>
        </div>

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

export default UpdateAdmin;
