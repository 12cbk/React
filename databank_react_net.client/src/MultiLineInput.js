import React, { useState } from "react";
import { Textarea } from "@heroui/react";

const MultiLineInput = ({ label, description, value, onChange, placeholder }) => {
  const [isInvalid, setIsInvalid] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const isbnValidation = (value) => {
    const lines = value.split("\n");
    
    // Check number of ISBNs
    if (lines.length > 500) {
      setErrorMessage('A maximum of 500 ISBNs is permitted. Enter one ISBN to a line without hyphens');
      setIsInvalid(true);
      return false;
    }
    
    // Check each ISBN length
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].length > 13) {
        setErrorMessage('A maximum of 13 characters per line is permitted');
        setIsInvalid(true);
        return false;
      }
    }
    
    setIsInvalid(false);
    setErrorMessage("");
    return true;
  };

  const handleChange = (e) => {
    const newValue = e.target.value;
    isbnValidation(newValue);
    onChange(newValue);
  };

  return (
    <div className="multiline-input">
      <label className="block text-sm font-medium">{label}</label>
      {description && (
        <p className="text-xs text-gray-600 mb-1">{description}</p>
      )}
      <Textarea
        placeholder={placeholder}
        variant="bordered"
        disableAnimation
        disableAutosize
        classNames={{
          base: "w-full max-w-md",
          input: "resize-y min-h-[100px] overflow-y-auto",
        }}
        value={value}
        onChange={handleChange}
        isInvalid={isInvalid}
        errorMessage={errorMessage}
      />
    </div>
  );
};

export default MultiLineInput;