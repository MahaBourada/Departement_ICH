import React, { useState } from "react";
import api from "../../api/api.js";
import MessagePopup from "../../components/MsgPopup.jsx";
import { InputField } from "../../components/Inputs.jsx";
import {
  SmallBorderButton,
  SmallFilledButton,
} from "../../components/Buttons.jsx";

const AdminForm = () => {
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
      !values.username ||
      !values.email ||
      !values.role
    ) {
      setMsg("Tous les champs sont obligatoires.");
      setMsgShow(true);
      return;
    }

    try {
      const response = await api.post("/admin", values);

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
    <main className="mx-14 mt-20">
      <h1 className="text-dynamic-2xl font-semibold ">
        Ajouter un nouvel administrateur
      </h1>

      {msgShow && (
        <MessagePopup message={msg} onClose={handleClose} status={msgStatus} />
      )}

      <form onSubmit={handleSubmit} className="flex flex-col m-5">
        <div className="flex items-start justify-between mb-3">
          <div className="flex flex-col w-1/2 mr-3">
            <InputField
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

        <div className="flex items-start justify-between mb-3">
          <div className="flex flex-col w-1/2 mr-3">
            <InputField
              type="email"
              label="E-mail *"
              name="lastname"
              placeholder="example@mail.com"
              value={values.email}
              onChange={(e) => setValues({ ...values, email: e.target.value })}
            />
          </div>

          <div className="flex flex-col w-1/2">
            <label
              htmlFor="role"
              className="font-main font-medium my-1"
            >
              Rôle *
            </label>
            <select
              name="role"
              id="role"
              className="bg-gray-100 border-gray-200 border-2 rounded-xl px-5 py-[0.95rem] mr-2 outline-gray-500 dark:text-black dark:bg-gray-400 dark:border-gray-700"
              onChange={(e) => setValues({ ...values, role: e.target.value })}
            >
              <option value="">Selectionez une option</option>
              <option value="Super admin">Super admin</option>
              <option value="Admin">Admin</option>
            </select>
          </div>
        </div>

        <div className="flex items-start justify-between mb-3">
          <div className="flex flex-col w-1/2 mr-3">
            <InputField
              type="text"
              label="Nom d'utilisateur *"
              name="username"
              placeholder="jdoe"
              value={values.username}
              onChange={(e) =>
                setValues({ ...values, username: e.target.value })
              }
            />
          </div>
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
            text="Ajouter"
          />
        </div>
      </form>
    </main>
  );
};

export default AdminForm;
