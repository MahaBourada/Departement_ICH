import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useRef } from "react";

const HorizontalCarousel = ({ collabs }) => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    const scrollAmount = 300;
    scrollRef.current?.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative my-16">
      <div
        ref={scrollRef}
        className="flex flex-row items-center overflow-x-auto space-x-16 px-10 mx-20 max-sm:mx-10 scroll-smooth hide-scrollbar dark:bg-neutral-500 dark:rounded-4xl py-6"
      >
        {collabs
          .filter(
            (collab) =>
              collab.type === "Nationale" &&
              collab.categorie === "Partenaire socio-économique"
          )
          .map((collab, index) => (
            <div
              key={index}
              className="flex-shrink-0 flex items-center justify-center"
            >
              <img
                src={`${import.meta.env.VITE_BASE_URL}/${collab.logo}`}
                alt={`Logo de l'entreprise ${collab.nom}`}
                className="w-52 max-sm:w-40"
              />
            </div>
          ))}
      </div>

      {/* Left Button */}
      <button
        aria-label="Défiler à gauche"
        onClick={() => scroll("left")}
        className="absolute left-0 max-sm:-left-4 top-1/2 -translate-y-1/2 z-10 bg-neutral-200 p-1.5 border-black border-2 rounded-full hover:bg-neutral-400 cursor-pointer"
      >
        <ChevronLeft
          size={37}
          strokeWidth={2.5}
          className="text-black pr-0.5 max-sm:w-8 max-sm:h-8"
        />
      </button>

      {/* Right Button */}
      <button
        aria-label="Défiler à droite"
        onClick={() => scroll("right")}
        className="absolute right-0 max-sm:-right-4 top-1/2 -translate-y-1/2 z-10 bg-neutral-200 p-1.5 border-black border-2 rounded-full hover:bg-neutral-400 cursor-pointer"
      >
        <ChevronRight
          size={37}
          strokeWidth={2.5}
          className="text-black pl-0.5 max-sm:w-8 max-sm:h-8"
        />
      </button>
    </div>
  );
};

export default HorizontalCarousel;
