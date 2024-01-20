import React from "react";

const ChoosingBarFromArray = (props) => {
  const inputId = `select-${props.label.toLowerCase().replace(/ /g, '-')}`;

  return (
    <>
      {props.label && <label htmlFor={inputId} className="sr-only">{props.label}</label>}
      <select
        id={inputId}
        onChange={(e) => props.setResult(e.target.value)}
        className="w-full xl:w-6/12"
      >
        {props.options.map((option) => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
    </>
  );
};

export default ChoosingBarFromArray;
