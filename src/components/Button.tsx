import React from "react";
import { ButtonProps } from "../types";

const Button = ({ text, onClick, className }: ButtonProps) => {
  return (
    <button
      className={`inline-block rounded-md bg-blue text-white px-4 py-2 ${className}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
