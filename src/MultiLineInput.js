import React from "react";
import { Textarea } from "@heroui/react";

const MultiLineInput = ({ label, description, value, onChange, placeholder }) => {
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
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default MultiLineInput;
