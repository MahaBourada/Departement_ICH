// components/MessagePopup.jsx
import { X } from "lucide-react";
import { useEffect } from "react";

const MessagePopup = ({ message, status, onClose }) => {
  useEffect(() => {
    if (!message) return; // Do nothing if no message

    const timer = setTimeout(() => {
      onClose();
    }, 4000);

    return () => clearTimeout(timer);
  }, [message, onClose]); // include dependencies

  if (!message) return null;

  return (
    <div
      className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white font-main font-medium text-2xl shadow-small w-80 px-4 py-6 rounded-4xl z-50`}
    >
      <div className="flex w-full justify-end">
        <button
          type="button"
          className="cursor-pointer hover:translate-[1px]"
          onClick={onClose}
        >
          <X aria-label="Fermer" size={30} color="#232323" strokeWidth={3} />
        </button>
      </div>
      {status == 200 ? (
        <>
          <img
            src="/ich/assets/vectors/Success.svg"
            alt="Succès"
            className="m-auto w-36"
          />
          <p className="font-main text-5xl font-semibold text-center py-3 text-[#008609]">Succès</p>
        </>
      ) : (
        <>
          <img
            src="/ich/assets/vectors/Error.svg"
            alt="Erreur"
            className="m-auto w-36"
          />
          <p className="font-main text-5xl font-semibold text-center py-3 text-[#8B0000]">Erreur</p>
        </>
      )}
      <p className="py-5 m-auto text-center text-wrap">{message}</p>
    </div>
  );
};

export default MessagePopup;
