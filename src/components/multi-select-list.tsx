'use client';

import { useState } from "react";
import { ChevronDown, X } from "lucide-react";
import { MultiSelectListProps } from "@/interfaces/MultiSelectListProps";

const MultiSelectList = <T extends { id: number }>({
  selectListLabel,
  options,
  selected,
  setSelected,
  getOptionLabel
}: MultiSelectListProps<T>) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (value: T) => {
    if (!selected.find((s) => s.id === value.id)) {
      setSelected([...selected, value]);
    }
    setIsOpen(false);
  };

  const handleRemove = (id: number) => {
    setSelected(selected.filter((item) => item.id !== id));
  };

  const filteredOptions = options.filter(
    (option) => !selected.find((s) => s.id === option.id)
  );

  return (
    <div className="relative w-full">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center px-4 py-2 border border-gray-300 rounded-lg bg-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      >
        <span className="text-gray-700">
          {selected.length > 0
            ? `${selected.length} selected`
            : "Select " + selectListLabel}
        </span>
        <ChevronDown className="w-4 h-4 text-gray-500" />
      </button>

      {isOpen && (
        <ul className="absolute bottom-full mt-1 w-full max-h-96 bg-white border border-gray-200 rounded-lg shadow-lg z-10 overflow-auto">
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option, index) => (
              <li
                key={index}
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleSelect(option)}
              >
                {getOptionLabel(option)}
              </li>
            ))
          ) : (
            <li className="px-4 py-2 text-gray-400">No options</li>
          )}
        </ul>
      )}

      {/* Selected Badges */}
      {selected.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {selected.map((item) => (
            <span
              key={item.id}
              className="flex items-center px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded-full"
            >
              {getOptionLabel(item)}
              <X
                className="ml-2 w-4 h-4 cursor-pointer text-blue-500 hover:text-red-500"
                onClick={() => handleRemove(item.id)}
              />
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default MultiSelectList;
