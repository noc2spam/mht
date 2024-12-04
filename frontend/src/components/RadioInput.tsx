import { useState } from "react";

export default function RadioInput({
  name,
  options,
  defaultValue = "",
  onChange = () => {},
}: {
  name: string;
  options: { value: string; label: string }[];
  defaultValue?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  const [value, setValue] = useState(defaultValue);
  return (
    <div className="flex items-center gap-2 my-2">
      {options.map((option) => (
        <div key={option.value} className="flex items-center mb-2">
          <input
            type="radio"
            id={option.value}
            name={name}
            defaultValue={option.value}
            checked={value.length > 0 ? value === option.value : undefined}
            onChange={(e) => {
              setValue(e.target.value);
              onChange(e);
            }}
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
          />
          <label htmlFor={option.value} className="!mb-0 !text-xs !ml-2">
            {option.label}
          </label>
        </div>
      ))}
    </div>
  );
}
