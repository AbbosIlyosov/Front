'use client';

import { useState } from "react";
import { ChevronDown } from "lucide-react";

type SelectListProps = {
  label: string;
  options: string[];
  onChange?: (value: string) => void;
};


const SelectList: React.FC<SelectListProps>= ({ label, options, onChange }) => {
    const [selected, setSelected] = useState<string>("");
    const [isOpen, setIsOpen] = useState<boolean>(false);
  
    const handleSelect = (value: string) => {
      setSelected(value);
      
      if(onChange){
        onChange(value);
      }
      setIsOpen(false);
    };
  
    return (
      <div className="relative w-full">
        {/* <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label> */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex justify-between items-center px-4 py-2 border border-gray-300 rounded-lg bg-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <span className="text-gray-700">{selected || "Select " + label}</span>
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
                {option}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
}

export default SelectList