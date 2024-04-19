import React from "react";

type SelectProps = {
  options: string[];
  label: string;
  handleSelect: (event: React.ChangeEvent<HTMLSelectElement>) => void;
};
const Select = ({ options, label, handleSelect }: SelectProps) => {
  return (
    <select id={label} onChange={(e) => handleSelect(e)}>
      {label && <option value={label}>{label}</option>}
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

export default Select;
