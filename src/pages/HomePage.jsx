import React from "react";

const HomePage = () => {
  return (
    <main className="flex-grow leading-9">
      <div className="h-72 bg-cover bg-center bg-no-repeat flex items-center justify-center bg-[url('/assets/images/HomeImage.png')]">
        <h1
          className="text-white font-main font-semibold text-display text-center"
          style={{ textShadow: "2px 2px 5px #333" }}
        >
          Département Ingénierie - Cognition - Handicap <br /> <br /> UFR eriTES
        </h1>
      </div>

      <div className="my-10 mb-20 mx-16 font-body">
        <div>
          <p className="my-7">
            <span className="font-semibold">
              Le département ICH (Ingénierie Cognition Handicap)
            </span>
            de l'Université Paris 8 est spécialisé dans la recherche et le
            développement de{" "}
            <span className="font-semibold">technologies d'assistance</span>{" "}
            destinées aux{" "}
            <span className="font-semibold">
              personnes en situation de handicap
            </span>
            . Il conçoit des outils techniques visant à améliorer la
            communication, la perception, l'apprentissage et l'interaction
            sociale, en s'appuyant sur des approches issues de{" "}
            <span className="font-semibold">
              l'intelligence artificielle, de l'apprentissage automatique et des
              interfaces homme-machine.
            </span>
          </p>
        </div>

        <div className="flex justify-between items-start">
          <div className="w-1/2">
            <p className="font-semibold">
              Les travaux du département s'articulent autour de plusieurs axes :
            </p>
            <ul className="list-disc ml-7">
              <li>
                La conception, la mise en œuvre et l'évaluation d'outils
                technologiques adaptés aux besoins des personnes handicapées.
              </li>
              <li>
                L'analyse des expériences et des besoins des usagers afin
                d'optimiser les solutions proposées.
              </li>
              <li>
                Le développement de modèles et d'interfaces basés sur
                l'intelligence artificielle et l'apprentissage automatique.
              </li>
            </ul>

            <p className="my-10">
              Le département ICH est également impliqué dans la formation à
              travers le{" "}
              <span className="font-semibold">
                Master MIASHS, spécialité Technologie et Handicap
              </span>
              . Ce programme vise à former des étudiants à{" "}
              <span className="font-semibold">
                la conception et au développement de technologies d'assistance
              </span>
              , en alliant enseignements théoriques, travaux pratiques et
              expériences en milieu professionnel.
            </p>

            <p className="my-10">
              Par ses activités de recherche et d'enseignement, le département
              contribue à{" "}
              <span className="font-semibold">
                l'amélioration des conditions de vie des personnes handicapées
              </span>{" "}
              en développant des solutions adaptées à leurs besoins spécifiques.
            </p>
          </div>

          <div className="w-[38rem] h-[38rem] bg-cover bg-center bg-no-repeat bg-[url('/assets/images/unicorn.jpeg')] rounded-[50px]"></div>
        </div>

        <div className="flex justify-between my-10">
          <img src="/assets/images/img2.png" alt="" width={400} />
          <img src="/assets/images/img3.png" alt="" width={400} />
          <img src="/assets/images/Nao.png" alt="" width={400} />
        </div>
      </div>
    </main>
  );
};

export default HomePage;
