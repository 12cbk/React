import React from "react";
import { RadioGroup, Radio } from "@heroui/react";
import './Radiogroup.css';

const Radiogroup = ({ index, label,  values, sublabel, SelectedAnswer, onAnsSelect, name }) => {
  return (
    <div className="radio-group-container">
      <RadioGroup key={index} label={label} value={SelectedAnswer} onValueChange={onAnsSelect}>         
        
        {sublabel && Array.isArray(sublabel) && (
          <div className="radio-description">
            {sublabel.map((line, idx) => (
              <p key={idx}>{line}</p>
            ))}
          </div>
        )}

        {/* {values.map((value, idx) => (
          <Radio key={idx} value={value.value} name={name}>
            {value.text}
          </Radio>
        ))} */}
        {values.map((value, idx) => {
          if (value.value === "heading") {
            return (
              <div key={idx} style={{ color: "#6b7280", fontWeight: 600 }}>
                {value.text}
              </div>
            );
          }
          return (
            <Radio key={idx} value={value.value} name={name}>
              {value.text}
            </Radio>
          );
        })}
      </RadioGroup>
    </div>
  );
};

export default Radiogroup;


