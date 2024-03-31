"use client";

import React, { useState } from "react";
import { InputProps } from "../types";

const Input = ({
  id,
  value,
  type,
  placeholder,
  onChange,
  label,
}: InputProps) => {
  const [inputValue, setInputValue] = useState("");

  return (
    <div className="relative mb-6">
      <label htmlFor={id}>{label}</label>
      <div className="relative">
        <input
          id={id}
          className={`w-full appearance-none rounded-md border-DEFAULT p-3`}
          placeholder={placeholder}
          type={type == "number" ? "text" : type}
          inputMode={type == "number" ? "numeric" : undefined}
          pattern={type == "number" ? "[0-9]*" : undefined}
          value={value}
          onChange={(e) => {
            onChange(e), setInputValue(e.target.value);
          }}
        />
      </div>
    </div>
  );
};

export default Input;
