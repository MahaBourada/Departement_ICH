import React, { useState } from "react";
import api from "../../api/api.js";
import MessagePopup from "../../components/MsgPopup.jsx";

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
      <h1 className="text-display font-semibold ">
        Ajouter un nouveau administrateur
      </h1>

      {msgShow && (
        <MessagePopup message={msg} onClose={handleClose} status={msgStatus} />
      )}

      <form onSubmit={handleSubmit} className="flex flex-col mx-5">
        <div className="flex items-start justify-between mb-3">
          <div className="flex flex-col w-1/2 mr-3">
            <label
              htmlFor="firstname"
              className="text-nav font-main font-medium my-1"
            >
              Prénom *
            </label>
            <input
              type="text"
              name="firstname"
              id="firstname"
              placeholder="Jane"
              className="bg-white rounded-2xl px-5 py-[0.65rem] border-[1px] border-black mr-2 outline-none shadow-small"
              onChange={(e) =>
                setValues({ ...values, firstname: e.target.value })
              }
            />
          </div>

          <div className="flex flex-col w-1/2">
            <label
              htmlFor="lastname"
              className="text-nav font-main font-medium my-1"
            >
              Nom *
            </label>
            <input
              type="text"
              name="lastname"
              id="lastname"
              placeholder="DOE"
              className="bg-white rounded-2xl px-5 py-[0.65rem] border-[1px] border-black mr-2 outline-none shadow-small"
              onChange={(e) =>
                setValues({ ...values, lastname: e.target.value })
              }
            />
          </div>
        </div>

        <div className="flex items-start justify-between mb-3">
          <div className="flex flex-col w-1/2 mr-3">
            <label
              htmlFor="email"
              className="text-nav font-main font-medium my-1"
            >
              E-mail *
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="example@mail.com"
              className="bg-white rounded-2xl px-5 py-[0.65rem] border-[1px] border-black mr-2 outline-none shadow-small"
              onChange={(e) => setValues({ ...values, email: e.target.value })}
            />
          </div>

          <div className="flex flex-col w-1/2">
            <label
              htmlFor="role"
              className="text-nav font-main font-medium my-1"
            >
              Rôle *
            </label>
            <select
              name="role"
              id="role"
              className="bg-white rounded-2xl px-5 py-[0.8rem] border-[1px] border-black mr-2 outline-none shadow-small"
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
            <label
              htmlFor="username"
              className="text-nav font-main font-medium my-1"
            >
              Nom d'utilisateur *
            </label>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="jdoe"
              className="bg-white rounded-2xl px-5 py-[0.65rem] border-[1px] border-black mr-2 outline-none shadow-small"
              onChange={(e) =>
                setValues({ ...values, username: e.target.value })
              }
            />
          </div>
        </div>

        <div className="flex justify-end mt-3">
          <button
            type="reset"
            className="cursor-pointer bg-white border-1 border-black font-main font-medium rounded-2xl px-5 py-3 ml-2 shadow-small hover:translate-[1px] hover:shadow-none"
          >
            Réinitialiser
          </button>
          <button
            type="submit"
            className="cursor-pointer bg-accent font-main font-medium rounded-2xl px-5 py-3 mx-3 shadow-small hover:translate-[1px] hover:shadow-none"
          >
            Ajouter
          </button>
        </div>
      </form>
    </main>
  );
};

export default AdminForm;
