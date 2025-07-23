import React from 'react';
import { CheckboxGroup, Checkbox } from "@heroui/react";

const Checkboxgroup = ({ label, name, values = [], selectedValues = [], onChange }) => {
  
  const safeSelectedValues = Array.isArray(selectedValues) ? selectedValues : [];

  return (
    <div className="checkbox-group">
      <CheckboxGroup
        label={label}
        value={safeSelectedValues}
        onChange={(newSelectedValues) => {
          onChange(newSelectedValues); 
        }}
      >
        {values.map((item, idx) => (
          <Checkbox key={idx} value={item.value}>
            {item.text}
          </Checkbox>
        ))}
      </CheckboxGroup>
    </div>
  );
};

export default Checkboxgroup;
