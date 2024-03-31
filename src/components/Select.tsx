import { Listbox } from "@headlessui/react";
import { SingleSelectDropdownProps } from "../types";
import { FaCheck, FaChevronDown } from "react-icons/fa";

const SingleSelectDropdown = ({
  title,
  options,
  selected,
  setSelected,
  className,
}: SingleSelectDropdownProps) => {
  return (
    <div className={`relative ${className}`}>
      <Listbox value={selected} onChange={setSelected}>
        <Listbox.Button className="relative border-DEFAULT w-full p-2 pr-6">
          {selected?.title || "Select " + title}
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <FaChevronDown className="" aria-hidden="true" />
          </span>
        </Listbox.Button>
        <Listbox.Options className="absolute left-0 right-0 top-8 z-10 mt-1 max-h-60 overflow-auto bg-white py-1 shadow-lg">
          {options.map((option) => (
            <Listbox.Option
              className={({ active, selected }) =>
                `relative flex flex-row p-3 select-none  ${active ?? ""}
                ${selected ? "" : ""}`
              }
              key={option.value}
              value={option}
            >
              {({ selected }) => (
                <>
                  <span className={`flex h-5 w-5 flex-row items-center mr-3 `}>
                    {selected && (
                      <FaCheck
                        className="m-[0.125rem] text-black"
                        aria-hidden="true"
                      />
                    )}
                  </span>
                  {option.title}
                </>
              )}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </Listbox>
    </div>
  );
};

export default SingleSelectDropdown;
