"use client";
import { useState } from "react";

export default function Select({
  name,
  id,
  options,
  selected: selectedOption,
  onChange,
}: {
  name: string;
  id: string;
  selected?: string;
  placeholder?: string;

  options: {
    value: string;
    label: string;
  }[];
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}) {
  const [selected, setSelected] = useState(selectedOption || "");
  return (
    <select
      className="block w-full px-4 py-2 mt-2 text-base text-gray-700 placeholder-gray-400 bg-white border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
      name={name}
      id={id}
      value={selected}
      onChange={(e) => {
        setSelected(e.target.value);

        if (onChange) {
          onChange(e);
        }
      }}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
