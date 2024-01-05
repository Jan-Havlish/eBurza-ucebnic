import React from 'react'

const ChoosingBarFromArray = (props) => {
  return (
    <>
      {props.label && <label className="sr-only">{props.label}</label>}
      <select onChange={(e) => props.setResult(e.target.value)} className="w-full xl:w-6/12">
        {props.options.map((option) => (
          <option value={option} key={option}>{option}</option>
        ))}
      </select>
    </>
  )
}

export default ChoosingBarFromArray