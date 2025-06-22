import React, { useState } from "react";
import api from "../../../api/api.js";
import { MessagePopup } from "../../../components/MsgPopup.jsx";
import { InputField, SelectField } from "../../../components/Inputs.jsx";
import {
  SmallBorderButton,
  SmallFilledButton,
} from "../../../components/Buttons.jsx";

const AddAdmin = () => {
  const [values, setValues] = useState({
    firstname: "",
    lastname: "",
    email: "",
    username: "",
    role: "",
  });

  const [msg, setMsg] = useState("");
  const [msgShow, setMsgShow] = useState(false);
  const [msgStatus, setMsgStatus] = useState(0);

  const handleClose = () => {
    setMsgShow(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !values.firstname ||
      !values.lastname ||
      !values.email ||
      !values.role
    ) {
      setMsg("Tous les champs sont obligatoires.");
      setMsgShow(true);
      return;
    }

    const { username, ...data } = values;

    try {
      const response = await api.post("/admin", data);

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

  const handleReset = (e) => {
    e.preventDefault();
    setValues({
      firstname: "",
      lastname: "",
      email: "",
      username: "",
      role: "",
    });
  };

  return (
    <main className="mx-14 my-20">
      <h1 className="text-display font-semibold ">
        Ajouter un nouvel administrateur
      </h1>

      {msgShow && (
        <MessagePopup message={msg} onClose={handleClose} status={msgStatus} />
      )}

      <form
        onSubmit={handleSubmit}
        onReset={handleReset}
        className="flex flex-col m-5"
      >
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
              value={values.role}
              onChange={(e) => setValues({ ...values, role: e.target.value })}
              values={["Super admin", "Admin"]}
            />
          </div>
        </div>

        <div className="flex justify-end mt-3">
          <SmallBorderButton type="reset" text="Réinitialiser" />

          <SmallFilledButton type="submit" text="Ajouter" />
        </div>
      </form>
    </main>
  );
};

export default AddAdmin;
