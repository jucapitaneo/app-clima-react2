import React from 'react';

export default function ButtonPrimary({ children, onClick, disabled=false }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`px-4 py-2 rounded-md text-white font-medium transition disabled:opacity-50
        ${disabled ? 'bg-gray-400' : 'bg-indigo-600 hover:bg-indigo-700'}`}
    >
      {children}
    </button>
  );
}