import { ChevronLeft, ChevronRight } from "lucide-react";

const Pagination = ({ currentPage, setCurrentPage, totalPages }) => {
  return (
    <nav
      aria-label="Pagination"
      className="w-fit mx-auto mt-10 flex flex-row items-center space-x-3 text-neutral-600 font-medium dark:text-white"
    >
      <button
        aria-label={
          currentPage === 1 ? "Vous êtes à la première page" : "Page précédente"
        }
        onClick={() => {
          setCurrentPage((prev) => Math.max(prev - 1, 1)),
            window.scrollTo({ top: 0 });
        }}
        disabled={currentPage === 1}
        className={`bg-neutral-200 w-11 h-11 border-neutral-500 border-2 rounded-full  ${
          currentPage === 1
            ? "cursor-not-allowed opacity-75"
            : "cursor-pointer hover:bg-neutral-300"
        }`}
      >
        <ChevronLeft size={30} strokeWidth={2.2} className="m-auto pr-0.5" />
      </button>

      {[...Array(totalPages)].map((_, i) => (
        <button
          aria-label={`Page ${i + 1}`}
          key={i}
          onClick={() => {
            setCurrentPage(i + 1), window.scrollTo({ top: 0 });
          }}
          className={`w-11 h-11 border-neutral-500 border-2 rounded-full hover:bg-neutral-300 cursor-pointer ${
            currentPage === i + 1
              ? "bg-neutral-400 text-black"
              : "bg-neutral-200"
          }`}
        >
          <p
            aria-current={currentPage === i + 1 ? "page" : undefined}
            className="m-auto font-main"
          >
            {i + 1}
          </p>
        </button>
      ))}

      <button
        aria-label={
          currentPage === totalPages
            ? "Vous êtes à la dernière page"
            : "Page suivante"
        }
        onClick={() => {
          setCurrentPage((prev) => Math.min(prev + 1, totalPages)),
            window.scrollTo({ top: 0 });
        }}
        disabled={currentPage === totalPages}
        className={`bg-neutral-200 w-11 h-11 border-neutral-500 border-2 rounded-full  ${
          currentPage === totalPages
            ? "cursor-not-allowed opacity-75"
            : "cursor-pointer hover:bg-neutral-300"
        }`}
      >
        <ChevronRight size={30} strokeWidth={2.2} className="m-auto pl-0.5" />
      </button>
    </nav>
  );
};

export default Pagination;
