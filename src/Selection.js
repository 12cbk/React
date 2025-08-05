import { Select, SelectItem } from "@heroui/react";
import React, { useEffect, useState } from "react";
import { fetchData } from "./ApiService";
import formatFeedRequirements from './Formatfeed';


const optionsCache = new Map();

const Selection = ({
  selectedKey,
  selectedValues,
  selectedlabel,
  onSelectionChange,
  fromleft = false,
  type = "Subject"
}) => {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    const fetchOptions = async () => {
      try {   
              
        if (optionsCache.has(selectedKey)) {
          const cachedOptions = optionsCache.get(selectedKey);
          setOptions(cachedOptions);
          return;
        }

        let keyToUse = selectedKey === "HE" ? "ACHE" : selectedKey;
        let optionElements = [];

        if (type === "Subject") {
          if (keyToUse === "abc" && !fromleft) {
            const extractedData = await fetchData("ELT");
            optionElements = extractedData.map(item => {
              const opt = document.createElement("option");
              opt.value = item.value;
              opt.textContent = item.text;
              return opt;
            });
          } else {
            const response = await fetch(`./Subject${keyToUse}.html`);
            const html = await response.text();
            const doc = new DOMParser().parseFromString(html, "text/html");
            optionElements = doc.querySelectorAll("select[name='test'] option");
          }
        }

        if (type === "series") {
          const response = await fetch(`./Series${keyToUse}.html`);
          const html = await response.text();
          const doc = new DOMParser().parseFromString(html, "text/html");
          optionElements = doc.querySelectorAll("select[name='test'] option");
        }

       const formattedOptions = [
  { key: "*", label: "All" },
  ...Array.from(optionElements)
    .filter(opt => opt.value.replace(/0+$/, '') !== keyToUse.replace(/0+$/, ''))
    .map(opt => ({
      key: opt.value,
      label: opt.textContent
    }))
];

        //setOptions(formattedOptions);
        optionsCache.set(selectedKey, formattedOptions);
        setOptions(formattedOptions);

      } catch (err) {
        console.error(`Error fetching options for ${selectedKey}:`, err);
      }
    };

    fetchOptions();
  }, [selectedKey, fromleft]);

  const handleSelection = (keys) => {
    const selectedKeys = Array.from(keys);
    const selectedLabels = selectedKeys.map(k =>
      options.find(opt => opt.key === k)?.label || k
    );
    onSelectionChange(selectedKeys, selectedLabels);
  };

  return (
    <Select
      className="max-w-xs"
      label={selectedlabel}
      selectionMode="multiple"
      color="primary"
      selectedKeys={new Set(selectedValues)}
      onSelectionChange={handleSelection}      
     
    >
      {options.map(({ key, label }) => (
        <SelectItem key={key} value={key}>
          {label}
        </SelectItem>
      ))}
    </Select>
  );
};

export default Selection;