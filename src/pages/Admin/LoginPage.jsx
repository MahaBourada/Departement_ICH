import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api/api";
import { CircleArrowLeft } from "lucide-react";
import { InputField } from "../../components/Inputs";
import { BigFilledButton } from "../../components/Buttons";
import { UserContext } from "../../contexts/UserContext.jsx";
import AccessibilityMenu from "../../components/AccessibilityMenu.jsx";

const LoginPage = () => {
  const { setUser, setAccessToken, user, accessToken } =
    useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user && accessToken) {
      navigate("/admin/tableau-de-bord", { replace: true });
    }
  }, [user, accessToken, navigate]);

  const [values, setValues] = useState({
    username: "",
    password: "",
  });

  const [msg, setMsg] = useState("");
  const [msgShow, setMsgShow] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/auth/login", values, {
        withCredentials: true,
      });

      setUser({
        first_name: response.data.first_name,
        last_name: response.data.last_name,
        accessToken: response.data.accessToken,
      });
      setAccessToken(response.data.accessToken);

      navigate("/admin/tableau-de-bord");
    } catch (error) {
      const backendMsg =
        error?.response?.data?.message ||
        "Une erreur est survenue. Veuillez réessayer.";

      setMsg(backendMsg);
      setMsgShow(true);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[url('/ich/assets/vectors/AdminBg.svg')] dark:bg-[url('/ich/assets/vectors/AdminBgDark.svg')] bg-cover bg-no-repeat bg-center text-black dark:text-gray-300 leading-11 readerMode:leading-loose dark:bg-dark-background text-nav max-sm:text-[1.125rem]">
      <title>Connexion - Espace Admin</title>

      <header className="flex flex-row items-center justify-between w-full leading-normal">
        <img
          src="/ich/assets/vectors/Logo.svg"
          alt="Logo de l'université Paris 8"
          width={160}
          className="m-5 block dark:hidden max-sm:w-24 max-sm:mx-4"
        />
        <img
          src="/ich/assets/vectors/LogoDark.svg"
          alt="Logo de l'université Paris 8"
          width={160}
          className="m-5 hidden dark:block max-sm:w-24 max-sm:mx-4"
        />

        <div className="mx-2">
          <AccessibilityMenu hoverColor="bg-gray-900" />
        </div>
      </header>

      <main className="mx-auto mt-7">
        <div className="flex justify-between items-center">
          <Link
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            to="/"
            className="rounded-md transition-colors duration-300 hover:bg-neutral-300 dark:hover:bg-neutral-600"
          >
            <CircleArrowLeft
              aria-label="Revenir à l'accueil"
              size={40}
              strokeWidth={2}
              className="text-[#232323] dark:text-gray-300"
            />
          </Link>
          <h1 className="m-auto text-center text-display max-sm:text-header font-medium font-main dyslexiaTheme:font-dyslexia">
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
