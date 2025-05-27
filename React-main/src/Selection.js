import { Select, SelectItem } from "@heroui/react";
import React, { useEffect, useState } from "react";

const Selection = ({ selectedKey, selectedValues, onSelectionChange }) => {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const response = await fetch(`./Subject${selectedKey}.html`);
        const html = await response.text();
        const doc = new DOMParser().parseFromString(html, "text/html");
        const optionElements = doc.querySelectorAll("select[name='test'] option");

        setOptions(
          Array.from(optionElements).map((opt) => ({
            key: opt.value,
            label: opt.textContent,
          }))
        );
      } catch (err) {
        console.error(`Error fetching options for ${selectedKey}:`, err);
      }
    };

    fetchOptions();
  }, [selectedKey]);

  return (
    <div className="min-w-[250px]">
      <h4 className="text-lg font-bold">{selectedKey} Options</h4>
      <Select
        label="Select options"
        selectionMode="multiple"
        selectedKeys={new Set(selectedValues)}
        onSelectionChange={(keys) => onSelectionChange(Array.from(keys))}
      >
        {options.map(({ key, label }) => (
          <SelectItem key={key} value={key}>
            {label}
          </SelectItem>
        ))}
      </Select>
    </div>
  );
};

export default Selection;
