import { Mail, MapPin, Phone } from "lucide-react";
import React from "react";

const IndividualPage = () => {
  return (
    <main className="flex-grow my-10 mb-20 mx-16">
      <h1 className="font-main font-semibold text-display my-2 mb-4">
        Anis ROJBI
      </h1>

      <div className="flex items-start justify-between">
        <div className="m-2">
          <h2 className="font-medium text-header font-main">
            Directeur du département
          </h2>
          <p className="font-semibold text-2xl m-2">Maître de conférences</p>
          <p className="mx-2">61e section</p>
          <ul className="list-disc mx-9 leading-9">
            <li>Génie informatique</li>
            <li>Automatique</li>
            <li>Traitement du signal</li>
          </ul>

          <h2 className="font-medium text-header font-main mt-4">Contact</h2>

          <div className="flex items-center my-2">
            <MapPin size={32} color="#232323" />
            <p className="mx-2">Bâtiment D- Salle D111</p>
          </div>

          <div className="flex items-center my-4">
            <Mail size={32} color="#232323" />
            <p className="mx-2">anis.rojbi@univ-paris8.fr</p>
          </div>

          <div className="flex items-center my-4">
            <Phone size={32} color="#232323" />
            <p className="mx-2">0712345678</p>
          </div>
        </div>

        <img
          src="/src/assets/images/Anis.png"
          alt="Photo de Anis ROJBI"
          width={350}
          className="rounded-3xl m-4 mx-10"
        />
      </div>
    </main>
  );
};

export default IndividualPage;
