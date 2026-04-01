import React from "react";

const GRADIENT = "bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500";
const GRADIENT_TEXT = `${GRADIENT} bg-clip-text text-transparent`;

interface ConfirmModalProps {
  isOpen: boolean;
  isLoading: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  isLoading,
  onConfirm,
  onCancel,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-40">
      <div className="bg-white/90 backdrop-blur-xl border border-white/60 rounded-3xl p-8 max-w-sm w-full mx-4 text-center shadow-2xl">

        <div className={`p-[2px] rounded-full ${GRADIENT} w-16 h-16 mx-auto mb-5`}>
          <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
            <i className={`ri-error-warning-line text-2xl ${GRADIENT_TEXT}`} />
          </div>
        </div>

        <h3 className="text-base font-bold text-gray-800 mb-2">Delete User?</h3>
        <p className="text-xs text-gray-400 mb-7 leading-relaxed">
          This action is permanent. All user data will be removed and cannot be recovered.
        </p>

        <div className="flex gap-3 justify-center">
          <button
            onClick={onCancel}
            className="px-5 py-2.5 rounded-xl border border-purple-100 text-gray-500 text-xs font-semibold hover:bg-purple-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className={`px-5 py-2.5 rounded-xl ${GRADIENT} text-white text-xs font-bold transition-opacity disabled:opacity-60 flex items-center gap-2 shadow-md shadow-purple-200`}
          >
            {isLoading
              ? <><i className="ri-loader-4-line animate-spin" /> Deleting…</>
              : <><i className="ri-delete-bin-6-line" /> Delete User</>}
          </button>
        </div>

      </div>
    </div>
  );
};

export default ConfirmModal;
