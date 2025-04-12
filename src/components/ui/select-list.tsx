'use client';

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { SelectListProps } from "@/interfaces/SelectListProps";

const SelectList = <T extends { id: number }>({
  selectListLabel,
  options,
  selected,
  setSelected,
  getOptionLabel
}: SelectListProps<T>) => {
  
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleSelect = (value: T) => {

    if (setSelected && value.id > 0) {
      setSelected(value);
    }

    setIsOpen(false);
  };

  return (
    <div className="relative w-full">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center px-4 py-2 border border-gray-300 rounded-lg bg-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      >
        <span className="text-gray-700">{selected ? getOptionLabel(selected) : "Select " + selectListLabel}</span>
        <ChevronDown className="w-4 h-4 text-gray-500" />
      </button>
      {isOpen && (
        <ul className="absolute bottom-full mt-1 w-full max-h-96 bg-white border border-gray-200 rounded-lg shadow-lg z-10 overflow-auto">
          {options.map((option, index) => (
            <li
              key={index}
              className="px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleSelect(option)}
            >
              {getOptionLabel(option)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SelectList;
