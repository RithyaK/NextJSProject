import React from "react";

type SelectProps = {
  options: string[];
  label: string;
  id: string;
  handleSelect: (event: React.ChangeEvent<HTMLSelectElement>) => void;
};
const Select = ({ options, label, id, handleSelect }: SelectProps) => {
  return (
    <select id={id} onChange={(e) => handleSelect(e)}>
      {label && <option value="All">{label}</option>}
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

export default Select;
