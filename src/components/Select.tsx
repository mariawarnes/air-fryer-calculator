import { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { FaCheck, FaChevronDown } from "react-icons/fa";
import { OptionType, SingleSelectDropdownProps } from "../types";

const SingleSelectDropdown = ({
  title,
  options,
  selected,
  setSelected,
  className,
}: SingleSelectDropdownProps) => {
  // Group options by category, skipping grouping for those without a category
  const groupedOptions = options.reduce<Record<string, OptionType[]>>(
    (acc, option) => {
      const category = option.category ?? "";
      if (category) {
        acc[category] = acc[category] || [];
        acc[category].push(option);
      } else {
        // "Uncategorized" options are directly assigned without a category key
        acc[""] = acc[""] || [];
        acc[""].push(option);
      }
      return acc;
    },
    {}
  );

  return (
    <div className={`relative ${className}`}>
      <Listbox value={selected} onChange={setSelected}>
        {({ open }) => (
          <>
            <Listbox.Button className="relative text-left border-gray-200 border-2 rounded-md w-full p-3 pr-6 focus:ring-2 focus:ring-blue">
              {selected?.title || `Select ${title}`}
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <FaChevronDown className="" aria-hidden="true" />
              </span>
            </Listbox.Button>
            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute p-2 rounded-md bg-white left-0 right-0 top-10 z-10 mt-1 max-h-60 overflow-auto shadow-lg border-[1px]">
                {Object.entries(groupedOptions).map(([category, options]) => (
                  <div key={category}>
                    {/* Only render the category title if it exists */}
                    {category && (
                      <div className="text-gray-900 select-none p-3 font-semibold">
                        {category}
                      </div>
                    )}
                    {options.map((option) => (
                      <Listbox.Option
                        className={({ selected }) =>
                          `relative flex flex-row p-3 select-none hover:bg-gray-200 hover:text-black rounded-md ${
                            selected
                              ? "bg-blue text-white hover:bg-blue hover:text-white"
                              : ""
                          }`
                        }
                        key={option.value}
                        value={option}
                      >
                        {({ selected }) => (
                          <>
                            {selected && (
                              <FaCheck className="mr-2" aria-hidden="true" />
                            )}
                            {option.title}
                          </>
                        )}
                      </Listbox.Option>
                    ))}
                  </div>
                ))}
              </Listbox.Options>
            </Transition>
          </>
        )}
      </Listbox>
    </div>
  );
};

export default SingleSelectDropdown;
