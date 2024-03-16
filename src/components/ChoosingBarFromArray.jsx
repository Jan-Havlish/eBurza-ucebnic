import { useState, useEffect } from "react";
import PropTypes from 'prop-types';

const ChoosingBarFromArray = (props) => {
  const inputId = `select-${props.label.toLowerCase().replace(/ /g, '-')}`;

  const [selectedOption, setSelectedOption] = useState(props.options[0]); // Nastavení výchozí hodnoty na první prvek v poli options

  useEffect(() => {
    // Nastavení výchozí hodnoty, pokud je vstupní hodnota prázdná
    if (!props.value && props.options.length > 0) {
      setSelectedOption(props.options[0]);
    }
  }, [props.options, props.value]);

  const handleSelectChange = (e) => {
    setSelectedOption(e.target.value);
    props.setResult(e.target.value);
  };

  return (
    <>
      {props.label && <label htmlFor={inputId} className="sr-only">{props.label}</label>}
      <select
        id={inputId}
        onChange={handleSelectChange}
        value={selectedOption}
        className="w-full xl:w-6/12 text-zinc-900"
      >
        {props.options.map((option) => (
          <option key={option} value={option} className="text-zinc-900">{option}</option>
        ))}
      </select>
    </>
  );
};

export default ChoosingBarFromArray;

ChoosingBarFromArray.propTypes = {
  label: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  setResult: PropTypes.func.isRequired,
  value: PropTypes.string
};
