import {
  ChangeEventHandler,
  Dispatch,
  MouseEventHandler,
  SetStateAction,
} from "react";

export interface Option {
  title: string;
  value: string;
  symbol?: string;
  temperature?: number;
}

export interface SingleSelectDropdownProps {
  title: string;
  options: Option[];
  selected: Option | undefined;
  setSelected: Dispatch<SetStateAction<Option | undefined>>;
  className?: string;
}

export interface InputProps {
  onChange: ChangeEventHandler<HTMLInputElement>;
  id: string;
  placeholder: string | number | undefined;
  type: "number" | "search" | "text" | "password" | "email";
  label: string;
  name?: string;
  required?: boolean;
  value?: string | number;
}
