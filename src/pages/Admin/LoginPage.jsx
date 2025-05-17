import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api/api";
import { ArrowLeft } from "lucide-react";

const LoginPage = () => {
  const navigate = useNavigate();

  const [values, setValues] = useState({
    username: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/login", values, {
        withCredentials: true,
      });

      if (response.status === 200) return navigate("/admin/tableau-de-bord");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[url('/assets/vectors/AdminBg.png')] bg-cover bg-no-repeat bg-center text-black">
      <header>
        <img
          src="assets/vectors/Logo.svg"
          alt="Logo de l'université Paris 8"
          width={140}
          className="m-5"
        />
      </header>

      <main className="mx-auto mt-14">
        <div className="flex justify-between items-center">
          <Link
            onClick={() => window.scrollTo({ top: 0 })}
            to="/"
            className="hover:translate-[1px]"
          >
            <ArrowLeft
              aria-label="Revenir à l'accueil"
              size={38}
              color="#232323"
              strokeWidth={2.5}
            />
          </Link>
          <h1 className="m-auto text-center text-display font-medium font-main">
            Connexion
          </h1>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col w-96 mt-10 max-md:w-[20rem]">
          <div className="flex flex-col my-3 w-full">
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

          <div className="flex flex-col my-3 w-full">
            <label
              htmlFor="password"
              className="text-nav font-main font-medium my-1"
            >
              Mot de passe *
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Ceci est un secret"
              className="bg-white rounded-2xl px-5 py-[0.65rem] border-[1px] border-black mr-2 outline-none shadow-small"
              onChange={(e) =>
                setValues({ ...values, password: e.target.value })
              }
            />
          </div>

          <button
            type="button"
            className="w-fit mx-1 self-end cursor-pointer hover:translate-[1px] hover:underline"
          >
            Mot de passe oublié ?
          </button>

          <button
            type="submit"
            className="cursor-pointer bg-accent font-main font-medium rounded-2xl px-5 py-3 my-3 shadow-small hover:translate-[1px] hover:shadow-none w-full"
          >
            Connexion
          </button>
        </form>
      </main>
    </div>
  );
};

export default LoginPage;
