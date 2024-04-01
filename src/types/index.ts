import { ChangeEventHandler, Dispatch, SetStateAction } from "react";

export interface Option {
  title: string;
  value: string;
  symbol?: string;
  temperature?: number;
}

export interface Preset {
  title: string;
  value: string;
  temperature: number;
  time: number;
}

export interface SingleSelectDropdownProps {
  title: string;
  options: Option[] | Preset[];
  selected: Option | Preset | null | undefined;
  setSelected: SetStateAction<Option | Preset | null | undefined>;
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
