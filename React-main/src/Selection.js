import { Select, SelectItem } from "@heroui/react";
import React, { useEffect, useState } from "react";

const Selection = ({ selectedKey, onAddSelection }) => {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const response = await fetch(`./Subject${selectedKey}.html`);
        const html = await response.text();
        const doc = new DOMParser().parseFromString(html, "text/html");
        const optionElements = doc.querySelectorAll("select[name='test'] option");

        setOptions(Array.from(optionElements).map(option => ({
          key: option.value,
          label: option.textContent,
        })));
      } catch (error) {
        console.error(`Error loading options:`, error);
      }
    };

    fetchOptions();
  }, [selectedKey]);

  const handleSelectionChange = (keys) => {
    const combinedKeys = Array.from(keys).map(key => selectedKey + key.slice(2, 4));
    console.log("Combined values:", combinedKeys);
    onAddSelection(selectedKey, combinedKeys);
  };

  return (
    <Select className="max-w-xs" label="Select Subject" selectionMode="multiple" onSelectionChange={handleSelectionChange}>
      {options.map(({ key, label }) => (
        <SelectItem key={key} value={key}>
          {label}
        </SelectItem>
      ))}
    </Select>
  );
};

export default Selection;
