import React, { useContext, useState } from "react";
import { UserContext } from "../../../contexts/UserContext.jsx";
import api from "../../../api/api.js";
import { MessagePopup } from "../../../components/MsgPopup.jsx";
import { InputField } from "../../../components/Inputs.jsx";
import {
  BackButton,
  SmallBorderButton,
  SmallFilledButton,
} from "../../../components/Buttons.jsx";

const AddAdmin = () => {
  const currentAdmin = useContext(UserContext).user;
  const [values, setValues] = useState({
    firstname: "",
    lastname: "",
    email: "",
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
      currentAdmin: currentAdmin,
    };

    try {
      const response = await api.post("/admin", data, {
        headers: {
          Authorization: `Bearer ${currentAdmin.accessToken}`,
        },
        withCredentials: true,
      });

      setMsgStatus(200);
      setMsg(response.data.message);
      setMsgShow(true);
    } catch (error) {
      const backendMsg = error?.response?.data?.message;
      const backendErrors = error?.response?.data?.errors;

      setMsgStatus(0);

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

  const handleReset = (e) => {
    e.preventDefault();
    setValues({
      firstname: "",
      lastname: "",
      email: "",
    });
  };

  return (
    <main className="mx-14 my-20">
      <BackButton />

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

        <InputField
          isRequired={true}
          type="email"
          label="E-mail *"
          name="email"
          placeholder="example@mail.com"
          value={values.email}
          onChange={(e) => setValues({ ...values, email: e.target.value })}
        />

        <div className="flex justify-end mt-3">
          <SmallBorderButton type="reset" text="Réinitialiser" />

          <SmallFilledButton type="submit" text="Ajouter" />
        </div>
      </form>
    </main>
  );
};

export default AddAdmin;
