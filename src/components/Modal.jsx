// Modal.js
import React from 'react';

function Modal({ isOpen, onClose, message, type }) {
  if (!isOpen) return null;

  const modalClasses = `fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50`;
  const modalContentClasses = `bg-white p-6 rounded-lg shadow-lg text-center ${type === 'error' ? 'text-red-500' : 'text-green-500'}`;

  return (
    <div className={modalClasses} onClick={onClose}>
      <div
        className={modalContentClasses}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg font-semibold">{type === 'error' ? 'Error' : 'Success'}</h2>
        <p className="mt-2">{message}</p>
        <button
          className="mt-4 px-4 py-2 bg-yellow-800 text-white rounded-lg"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default Modal;
