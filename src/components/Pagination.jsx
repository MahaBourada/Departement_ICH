import { ChevronLeft, ChevronRight } from "lucide-react";

const Pagination = ({ currentPage, setCurrentPage, totalPages }) => {
  return (
    <nav
      aria-label="Pagination"
      className="w-fit mx-auto mt-10 flex flex-row items-center space-x-3 text-neutral-600 text-base font-medium font-numbers dyslexiaTheme:font-dyslexia dark:text-white"
    >
      <button
        aria-label={
          currentPage === 1 ? "Vous êtes à la première page" : "Page précédente"
        }
        onClick={() => {
          setCurrentPage((prev) => Math.max(prev - 1, 1)),
            window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        disabled={currentPage === 1}
        className={` w-9 h-9 border-neutral-500 dark:border-dark-white border-[1.5px] rounded-full  ${
          currentPage === 1
            ? "cursor-not-allowed bg-neutral-200 dark:bg-neutral-600 opacity-75 border-neutral-500 dark:border-neutral-400"
            : "cursor-pointer bg-neutral-200 dark:bg-neutral-500 hover:bg-neutral-300 dark:hover:bg-neutral-400 border-neutral-500 dark:border-neutral-300"
        }`}
      >
        <ChevronLeft size={26} strokeWidth={2.3} className="m-auto pr-0.5" />
      </button>

      {[...Array(totalPages)].map((_, i) => (
        <button
          aria-label={`Page ${i + 1}`}
          key={i}
          onClick={() => {
            setCurrentPage(i + 1),
              window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className={`w-9 h-9 border-[1.5px] rounded-full transition-colors duration-300 hover:bg-neutral-300 dark:hover:bg-neutral-500 border-neutral-500 dark:border-neutral-300 cursor-pointer
          ${
            currentPage === i + 1
              ? "bg-[#B8B8B8] dark:bg-neutral-400 text-neutral-700 dark:text-white"
              : "bg-neutral-200 dark:bg-transparent text-neutral-700 dark:text-white"
          }`}
        >
          <p
            aria-current={currentPage === i + 1 ? "page" : undefined}
            className="m-auto"
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
            window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        disabled={currentPage === totalPages}
        className={`w-9 h-9 border-[1.5px] rounded-full transition-colors duration-300 
        ${
          currentPage === totalPages
            ? "cursor-not-allowed bg-neutral-200 dark:bg-neutral-600 opacity-75 border-neutral-500 dark:border-neutral-400"
            : "cursor-pointer bg-neutral-200 dark:bg-neutral-500 hover:bg-neutral-300 dark:hover:bg-neutral-400 border-neutral-500 dark:border-neutral-300"
        }`}
      >
        <ChevronRight size={26} strokeWidth={2.3} className="m-auto pl-0.5" />
      </button>
    </nav>
  );
};

export default Pagination;
