import React from "react";
import { Link } from "react-router-dom";

const MembersPage = () => {
  return (
    <main className="flex-grow my-10 mb-20 mx-16">
      <h1 className="font-main font-semibold text-display my-2 mb-4">
        Équipe du département
      </h1>

      <h2 className="font-medium text-header font-main mx-2">
        Directeur du département
      </h2>

      <div className="grid grid-cols-2 mb-6">
        <Link
          to="anis-rojbi"
          className="border-2 border-black rounded-[50px] px-6 py-6 m-4 mx-5 hover:translate-[1px] hover:shadow-none"
        >
          <h3 className="font-main font-medium text-header">Anis ROJBI</h3>
          <div className="flex items-start">
            <img
              src="src/assets/images/Anis.png"
              alt="Photo de Anis ROJBI"
              width={200}
              className="rounded-3xl"
            />

            <div className="ml-4 my-2">
              <p className="font-semibold text-2xl my-2">Maître de conférences</p>
              <p className="mx-2">61e section</p>
              <ul className="list-disc mx-7 leading-9">
                <li>Génie informatique</li>
                <li>Automatique</li>
                <li>Traitement du signal</li>
              </ul>
            </div>
          </div>
        </Link>
      </div>

      <h2 className="font-medium text-header font-main mx-2">Administration</h2>

      <div className="grid grid-cols-2 mb-6">
        <Link
          to="rui-rosa"
          className="border-2 border-black rounded-[50px] px-6 py-6 m-4 mx-5 hover:translate-[1px] hover:shadow-none"
        >
          <h3 className="font-main font-medium text-header">Rui ROSA</h3>
          <div className="flex items-start">
            <img
              src="src/assets/images/Rui.png"
              alt="Photo de Rui ROSA"
              width={200}
              className="rounded-3xl"
            />

            <div className="ml-4 my-2">
              <p className="font-semibold text-2xl my-2">Secrétaire</p>
              {/* <p>61e section</p>
            <ul className="list-disc mx-5">
              <li>Génie informatique</li>
              <li>Automatique</li>
              <li>Traitement du signal</li>
            </ul> */}
            </div>
          </div>
        </Link>

        <Link
          to="subha-peroumal"
          className="border-2 border-black rounded-[50px] px-6 py-6 m-4 mx-5 hover:translate-[1px] hover:shadow-none"
        >
          <h3 className="font-main font-medium text-header">Subha PEROUMAL</h3>
          <div className="flex items-start">
            <img
              src="src/assets/images/Subha.png"
              alt="Photo de Subha PEROUMAL"
              width={200}
              className="rounded-3xl"
            />

            <div className="ml-4 my-2">
              <p className="font-semibold text-2xl my-2">Technicienne</p>
              {/* <p>61e section</p>
            <ul className="list-disc mx-5">
              <li>Génie informatique</li>
              <li>Automatique</li>
              <li>Traitement du signal</li>
            </ul> */}
            </div>
          </div>
        </Link>
      </div>

      <h2 className="font-medium text-header font-main mx-2">Enseignants</h2>

      <div className="grid grid-cols-2">
        <Link
          to="dominique-archaumbault"
          className="border-2 border-black rounded-[50px] px-6 py-6 m-4 mx-5 hover:translate-[1px] hover:shadow-none"
        >
          <h3 className="font-main font-medium text-header">
            Dominique ARCHAMBAULT
          </h3>
          <div className="flex items-start">
            <img
              src="src/assets/images/Dominique.png"
              alt="Photo de Dominique ARCHAMBAULT"
              width={200}
              className="rounded-3xl"
            />

            <div className="ml-4 my-2">
              <p className="font-semibold text-2xl my-2">Professeur des Universités</p>
              <p className="mx-2">27e section</p>
              <ul className="list-disc mx-7 leading-9">
                <li>Informatique</li>
              </ul>
            </div>
          </div>
        </Link>

        <Link
          to="salvatore-anzalone"
          className="border-2 border-black rounded-[50px] px-6 py-6 m-4 mx-5 hover:translate-[1px] hover:shadow-none"
        >
          <h3 className="font-main font-medium text-header">
            Salvatore ANZALONE
          </h3>
          <div className="flex items-start">
            <img
              src="src/assets/images/Salvatore.png"
              alt="Photo de Salvatore ANZALONE"
              width={200}
              className="rounded-3xl"
            />

            <div className="ml-4 my-2">
              <p className="font-semibold text-2xl my-2">Maître de conférences</p>
              <p className="mx-2">61e section</p>
              <ul className="list-disc mx-7 leading-9">
                <li>Génie informatique</li>
                <li>Automatique</li>
                <li>Traitement du signal</li>
              </ul>
            </div>
          </div>
        </Link>

        <Link
          to="johana-bodard"
          className="border-2 border-black rounded-[50px] px-6 py-6 m-4 mx-5 hover:translate-[1px] hover:shadow-none"
        >
          <h3 className="font-main font-medium text-header">Johana BODARD</h3>
          <div className="flex items-start">
            <img
              src="src/assets/images/Johana.png"
              alt="Photo de Johana BODARD"
              width={200}
              className="rounded-3xl"
            />

            <div className="ml-4 my-2">
              <p className="font-semibold text-2xl my-2">A fournir</p>
              {/* <p className="mx-2">61e section</p>
              <ul className="list-disc mx-7 leading-9">
                <li>Génie informatique</li>
                <li>Automatique</li>
                <li>Traitement du signal</li>
              </ul> */}
            </div>
          </div>
        </Link>

        <Link
          to="celine-jost"
          className="border-2 border-black rounded-[50px] px-6 py-6 m-4 mx-5 hover:translate-[1px] hover:shadow-none"
        >
          <h3 className="font-main font-medium text-header">Céline JOST</h3>
          <div className="flex items-start">
            <img
              src="src/assets/images/Celine.png"
              alt="Photo de Céline JOST"
              width={200}
              className="rounded-3xl"
            />

            <div className="ml-4 my-2">
              <p className="font-semibold text-2xl my-2">Maître de conférences</p>
              <p className="mx-2">27e section</p>
              <ul className="list-disc mx-7 leading-9">
                <li>Informatique</li>
              </ul>
            </div>
          </div>
        </Link>

        <Link
          to="isis-truck"
          className="border-2 border-black rounded-[50px] px-6 py-6 m-4 mx-5 hover:translate-[1px] hover:shadow-none"
        >
          <h3 className="font-main font-medium text-header">Isis TRUCK</h3>
          <div className="flex items-start">
            <img
              src="src/assets/images/Isis.png"
              alt="Photo de Isis TRUCK"
              width={200}
              className="rounded-3xl"
            />

            <div className="ml-4 my-2">
              <p className="font-semibold text-2xl my-2">Professeur des Universités</p>
              <p className="mx-2">27e section</p>
              <ul className="list-disc mx-7 leading-9">
                <li>Informatique</li>
              </ul>
            </div>
          </div>
        </Link>

        <Link
          to="gerard-uzan"
          className="border-2 border-black rounded-[50px] px-6 py-6 m-4 mx-5 hover:translate-[1px] hover:shadow-none"
        >
          <h3 className="font-main font-medium text-header">Gérard UZAN</h3>
          <div className="flex items-start">
            <img
              src="src/assets/images/Gerard.png"
              alt="Photo de Gérard UZAN"
              width={200}
              className="rounded-3xl"
            />

            <div className="ml-4 my-2">
              <p className="font-semibold text-2xl my-2">A fournir</p>
              {/* <p className="mx-2">61e section</p>
              <ul className="list-disc mx-7 leading-9">
                <li>Génie informatique</li>
                <li>Automatique</li>
                <li>Traitement du signal</li>
              </ul> */}
            </div>
          </div>
        </Link>
      </div>
    </main>
  );
};

export default MembersPage;
