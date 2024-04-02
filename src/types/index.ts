import { ChangeEventHandler, Dispatch, SetStateAction } from "react";

export interface OptionType {
  title: string;
  value: string;
  category?: string;
  symbol?: string;
  temperature?: number;
  time?: number;
}

export interface SingleSelectDropdownProps {
  title: string;
  options: OptionType[];
  selected: OptionType | null | undefined;
  setSelected: Dispatch<SetStateAction<OptionType | null | undefined>>;
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

export interface ButtonProps {
  text: string;
  onClick: () => void;
  className?: string;
}
