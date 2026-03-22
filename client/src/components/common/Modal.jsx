import { IoClose } from "react-icons/io5";

export default function Modal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      {/* Backdrop with blur */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className="
          relative w-full
          max-w-md
          sm:max-w-lg
          md:max-w-xl
          lg:max-w-2xl
          xl:max-w-3xl
          bg-white rounded-xl shadow-xl
          max-h-[90vh]
          flex flex-col
        "
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h2 className="text-lg font-semibold text-gray-900">{title}</h2>

          <button onClick={onClose}>
            <IoClose className="text-xl text-gray-500 hover:text-black" />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-6 overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}
