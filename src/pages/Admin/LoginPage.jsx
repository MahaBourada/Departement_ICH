import React from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();
    navigate("/admin/tableau-de-bord");
  };

  return (
    <div className="flex flex-col min-h-screen bg-[url('/assets/vectors/AdminBg.png')] bg-cover bg-no-repeat bg-center">
      <header>
        <img
          src="/assets/vectors/Logo.svg"
          alt="Logo de l'université Paris 8"
          width={140}
          className="m-5"
        />
      </header>
      <main className="mx-auto mt-14">
        <h1 className="text-center text-display font-medium font-main mb-10">
          Connexion
        </h1>
        <form onSubmit={(e) => onSubmit(e)} className="flex flex-col w-96">
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
