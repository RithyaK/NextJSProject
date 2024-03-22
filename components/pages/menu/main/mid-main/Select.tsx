import React from "react";

type SelectProps = {
  options: string[];
  label: string;
};
const Select = ({ options, label }: SelectProps) => {
  return (
    <select id="subject-select">
      {label && <option value="">{label}</option>}
      {options.map((option) => (
        <option key={option} className="subject" value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

export default Select;
