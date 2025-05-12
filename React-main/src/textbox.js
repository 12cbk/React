import React from "react";
import "./textbox.css";

const Textbox = ({ label, values, onTextChange }) => {
  return (
    <div className="input-container">
      <p>{label}</p>
      {values.map((item, index) => (
        <div key={index} className="input-group">
          <span className="field-name">{item.textboxlabel}</span>
          <input
            className="input"
            type="text"
            placeholder={`Enter ${item.textboxlabel}`}
            value={item.value || ""}
            onChange={(e) => onTextChange(item.textboxlabel, e.target.value)}
          />
        </div>
      ))}
    </div>
  );
};

export default Textbox;
