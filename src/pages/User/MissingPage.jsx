import React from "react";
import Header from "../../components/Navigation/UserHeader";
import Footer from "../../components/Navigation/Footer";

const MissingPage = () => {
  return (
    <>
      <Header />
      <main className="flex-grow flex items-start justify-evenly max-lg:flex-col my-20 mx-auto">
        <h1 className="font-main text-5xl max-md:text-lg font-semibold w-2/5 max-lg:w-fit mx-10 my-24 max-lg:my-6 leading-relaxed">
          Erreur 404 : La page a pris la fuite...
        </h1>
        <img
          src="assets/vectors/404.svg"
          width={600}
          alt=""
          role="presentation"
          className="p-3 " //dark:hidden
        />
        {/* <img
          src="/assets/vectors/404Dark.svg"
          width={600}
          alt=""
          role="presentation"
          className="p-3 hidden dark:block"
        /> */}
      </main>
      <Footer />
    </>
  );
};

export default MissingPage;
