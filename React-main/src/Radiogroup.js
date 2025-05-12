import React, { useState } from "react";
import { RadioGroup, Radio } from "@heroui/react";
import Dropdown from "./dropdown";
import Textbox from "./textbox";

const Radiogroup = ({ index, label, values, trigger }) => {
  const [selectedOption, setSelectedOption] = useState(""); 

  const handleRadioChange = (value) => {
    setSelectedOption(value); 
  };

  return (
    <div>
      <RadioGroup key={index} label={label}>
        {values.map((value, idx) => (
          <Radio
            key={idx}
            value={value.id}
            onChange={() => handleRadioChange(value.id)} 
          >
            {value.text}
          </Radio>
        ))}
      </RadioGroup>
      

      
      {selectedOption && trigger && trigger[selectedOption] && (
        <div>
          {trigger[selectedOption].type === "dropdown" && (
            <Dropdown
              label={trigger[selectedOption].label }
              values={trigger[selectedOption].values || []}
            />
          )}
          {trigger[selectedOption].type === "textbox" && (
            <Textbox
              label={trigger[selectedOption].label}
              value={trigger[selectedOption].placeholder || ""}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default Radiogroup;