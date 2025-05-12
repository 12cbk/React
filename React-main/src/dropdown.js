import React from 'react';
import './dropdown.css';

const dropdown = ({ label, values, selectedValue, onSelectChange }) => {
  // Find the text corresponding to the selected value
  const selectedText = values.find(item => item.value === selectedValue)?.text || label || "Select an option";

  return (
    <div className="menu">
      <div className="item">
        <div className="link">
          <span>{selectedText}</span>
          <svg viewBox="0 0 360 360" xmlSpace="preserve">
            <g id="SVGRepo_iconCarrier">
              <path id="XMLID_225_" d="M325.607,79.393c-5.857-5.857-15.355-5.858-21.213,0.001l-139.39,139.393L25.607,79.393 
              c-5.857-5.857-15.355-5.858-21.213,0.001c-5.858,5.858-5.858,15.355,0,21.213l150.004,150c2.813,2.813,6.628,4.393,10.606,4.393 
              s7.794-1.581,10.606-4.394l149.996-150C331.465,94.749,331.465,85.251,325.607,79.393z" />
            </g>
          </svg>
        </div>

        <div className="submenu">
          {values.map((item, index) => (
            <div key={index} className="submenu-item">
              <div className="submenu-link" onClick={() => onSelectChange(item.value)}> 
                {item.text}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};



export default dropdown;


