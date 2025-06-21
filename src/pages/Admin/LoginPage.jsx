import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api/api";
import { ArrowLeft } from "lucide-react";
import { InputField } from "../../components/Inputs";
import { BigFilledButton } from "../../components/Buttons";
import { UserContext } from "../../contexts/UserContext.jsx";
import AccessibilityMenu from "../../components/AccessibilityMenu.jsx";

const LoginPage = () => {
  const { setUser, setAccessToken } = useContext(UserContext);
  const navigate = useNavigate();

  const [values, setValues] = useState({
    username: "",
    password: "",
  });

  const [msg, setMsg] = useState("");
  const [msgShow, setMsgShow] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!values.username || !values.password) {
      setMsg("Tous les champs sont obligatoires.");
      setMsgShow(true);
      return;
    }

    try {
      const response = await api.post("/auth/login", values, {
        withCredentials: true,
      });

      setAccessToken(response.data.accessToken);
      setUser({
        first_name: response.data.first_name,
        last_name: response.data.last_name,
      });

      navigate("/admin/tableau-de-bord");
    } catch (error) {
      const backendMsg = error?.response?.data?.message;

      if (backendMsg) {
        setMsg(backendMsg); // Set the backend message from Express
        setMsgShow(true); // Trigger your popup or message display
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[url('/ich/assets/vectors/AdminBg.svg')] dark:bg-[url('/ich/assets/vectors/AdminBgDark.svg')] bg-cover bg-no-repeat bg-center text-black dark:text-gray-300 text-dynamic-base leading-11 readerMode:leading-loose dark:bg-dark-background">
      <header className="flex flex-row items-center justify-between w-full leading-normal">
        <img
          src="/ich/assets/vectors/Logo.svg"
          alt="Logo de l'université Paris 8"
          width={160}
          className="m-5 block dark:hidden"
        />
        <img
          src="/ich/assets/vectors/LogoDark.svg"
          alt="Logo de l'université Paris 8"
          width={160}
          className="m-5 hidden dark:block"
        />

        <div className="mx-6">
          <AccessibilityMenu />
        </div>
      </header>

      <main className="mx-auto mt-14">
        <div className="flex justify-between items-center">
          <Link
            onClick={() => window.scrollTo({ top: 0 })}
            to="/"
            className="rounded-md hover:bg-neutral-300"
          >
            <ArrowLeft
              aria-label="Revenir à l'accueil"
              size={38}
              strokeWidth={2.5}
              className="text-[#232323] dark:text-gray-300 "
            />
          </Link>
          <h1 className="m-auto text-center text-display font-medium font-main">
            Connexion
          </h1>
        </div>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col w-96 mt-10 max-md:w-[20rem]"
        >
          <InputField
            type="text"
            label="Nom d'utilisateur *"
            name="username"
            placeholder="jdoe"
            value={values.username}
            onChange={(e) => setValues({ ...values, username: e.target.value })}
          />

          <InputField
            type="password"
            label="Mot de passe *"
            name="password"
            placeholder="Ceci est un secret"
            value={values.password}
            onChange={(e) => setValues({ ...values, password: e.target.value })}
          />

          <button
            type="button"
            className="w-fit mx-1 self-end cursor-pointer hover:translate-[1px] hover:underline"
          >
            Mot de passe oublié ?
          </button>

          {msgShow && (
            <p className="text-[#8B0000] text-center text-xl font-medium m-2">
              {msg}
            </p>
          )}

          <BigFilledButton
            type="submit"
            bgColor="bg-accent"
            color="text-black"
            text="Connexion"
          />
        </form>
      </main>
    </div>
  );
};

export default LoginPage;
