import { X } from "lucide-react";
import { useEffect } from "react";
import { SyncLoader } from "react-spinners";
import { SmallBorderButton, SmallFilledButton } from "./Buttons";

export const MessagePopup = ({ message, status, onClose }) => {
  useEffect(() => {
    // Only auto-close if status is success or error
    if (status === 200 || status === 0) {
      const timer = setTimeout(() => {
        onClose();
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [status, onClose]); // include dependencies

  return (
    <div
      className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-dark-background dark:shadow-gray-900 font-main font-medium text-2xl shadow-small w-80 px-4 py-6 rounded-4xl z-50`}
    >
      <div className="flex w-full justify-end">
        <button
          type="button"
          className="cursor-pointer hover:translate-[1px]"
          onClick={onClose}
        >
          <X aria-label="Fermer" size={30} strokeWidth={3} />
        </button>
      </div>
      {status === 1 ? (
        <>
          <div className="flex justify-center items-center py-6">
            <SyncLoader
              color={"#0A0A0A"}
              size={20}
              aria-label="Chargement du Spinner"
            />
          </div>
        </>
      ) : status === 200 ? (
        <>
          <img
            src="/ich/assets/vectors/Success.svg"
            alt="Succès"
            className="m-auto w-36"
          />
          <p className="font-main text-5xl font-semibold text-center py-3 text-[#008609]">
            Succès
          </p>
        </>
      ) : (
        <>
          <img
            src="/ich/assets/vectors/Error.svg"
            alt="Erreur"
            className="m-auto w-36"
          />
          <p className="font-main text-5xl font-semibold text-center py-3 text-[#8B0000]">
            Erreur
          </p>
        </>
      )}

      <p className="py-5 m-auto text-center text-wrap">
        {status === 1 ? "Envoi en cours..." : message}
      </p>
    </div>
  );
};

export const ConfirmationModal = ({ isOpen, onCancel, onConfirm, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="bg-neutral-100 dark:bg-dark-background dark:shadow-gray-900 rounded-2xl shadow-small p-6 w-1/3 text-center font-main">
        <p className="font-medium mb-6">{message}</p>
        <div className="flex justify-around">
          <SmallBorderButton type="button" text="Annuler" onClick={onCancel} />
          <SmallFilledButton
            type="button"
            text="Confirmer"
            onClick={onConfirm}
          />
        </div>
      </div>
    </div>
  );
};
