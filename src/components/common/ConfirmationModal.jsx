/** @format */

import Spinner from "./Spinner";

const ConfirmationModal = ({
  isOpen,
  title,
  message,
  confirmText,
  cancelText = "Cancel",
  onConfirm,
  onClose,
  loading = false,
  success = false,
  error = "",
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-[90%] max-w-md rounded-lg bg-white p-6 shadow-xl">
        {loading ? (
          <div className="flex flex-col items-center py-6">
            <Spinner />

            <h1 className="mt-4 text-lg font-semibold text-gray-700">
              Please wait...
            </h1>

            <p className="mt-2 text-sm text-gray-500 text-center">
              We are processing your request.
            </p>
          </div>
        ) : success ? (
          <div className="flex flex-col items-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
              <span className="text-3xl font-bold text-green-600">✓</span>
            </div>

            <h2 className="mt-4 text-xl font-bold text-green-600">
              {confirmText}ed Successfully!
            </h2>

            <p className="mt-2 text-center text-gray-500">
              Your request has been completed successfully.
            </p>
          </div>
        ) : (
          <>
            <h2 className="text-xl font-bold text-gray-800">{title}</h2>

            <p className="mt-3 text-gray-600">{message}</p>

            {error && (
              <p className="mt-4 rounded-md bg-red-50 p-2 text-sm font-medium text-red-600">
                {error}
              </p>
            )}

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={onClose}
                className="rounded-md border border-gray-300 px-4 py-2 hover:bg-gray-100"
              >
                {cancelText}
              </button>

              <button
                onClick={onConfirm}
                className="rounded-md bg-blue-900 px-4 py-2 text-white hover:bg-blue-800"
              >
                {confirmText}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ConfirmationModal;
