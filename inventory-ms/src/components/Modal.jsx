import React from "react";

function Modal({title, children, onClose}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center
        bg-black/50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg w-full max-w-lg p-6 max-h-[90vh]
          overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        {children}
      </div>
    </div>
  );
}

export default Modal;
