import React from "react";

const Button = ({ children, onClick }) => {
  return (
    <button
      className="p-2 inline-block border border-gray-300 text-sm font-medium rounded-md"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
