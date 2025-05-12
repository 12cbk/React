import React from "react";
import { RadioGroup, Radio } from "@heroui/react";
import Dropdown from "./dropdown";
import Textbox from "./textbox";
import './Radiogroup.css'

const Radiogroup = ({ index, label, values, SelectedAnswer, onAnsSelect,name }) => {
  
  return (
    <div>
      <RadioGroup key={index} label={label} value={SelectedAnswer} onValueChange={onAnsSelect}      >
        {values.map((value, idx) => (
          <Radio key={idx} value={value.value} name={name}>
            {value.text}
          </Radio>
        ))}
      </RadioGroup>
      
      
    </div>
  );
};

export default Radiogroup;