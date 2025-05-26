import { Select, SelectItem } from "@heroui/react";
import React, { useEffect, useState } from "react";
import { SelectionProvider, useSelection } from "./Context";

const Selection = ({ selectedKey }) => {
  const [options, setOptions] = useState([]);
  const { addSelectionBox } = useSelection();

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
    addSelectionBox(selectedKey, combinedKeys);
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
