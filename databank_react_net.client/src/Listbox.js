import React, { useState, useEffect } from "react";
import { Listbox, ListboxItem } from "@heroui/react";

export default function DynamicListbox({
  name,
  label,
  values = [],
  selectedValues,
  onChange,
}) {
  
  const initial = Array.isArray(selectedValues) ? selectedValues[0] || "" : selectedValues || "";
  const [selectedKey, setSelectedKey] = useState(initial);

  useEffect(() => {
    const v = Array.isArray(selectedValues) ? selectedValues[0] || "" : selectedValues || "";
    setSelectedKey(v);
  }, [selectedValues]);

  const resolve = (raw) => {
     if (raw instanceof Set) raw = Array.from(raw)[0];
    if (raw === null || raw === undefined) return "";
    if (typeof raw === "string") return raw;
    const s = String(raw);
    const found = values.find(
      (it) => String(it.value) === s || String(it.text) === s || s.includes(String(it.value)) || s.includes(String(it.text))
    );
    return found ? String(found.value) : s;
  };

  const handleSelectionChange = (key) => {
    const picked = resolve(key);
    setSelectedKey(picked);
    onChange(picked);
  };

 
  const selectedKeysForListbox = selectedKey ? new Set([selectedKey]) : new Set();

  return (
    <div>
      {label && <label style={{ display: "block", marginBottom: 6 }}>{label}</label>}
      <Listbox
        aria-label={label || name || "Listbox"}
        selectionMode="single"
        selectedKeys={selectedKeysForListbox}
        onSelectionChange={handleSelectionChange}
      >
        {values.map((item) => (
          <ListboxItem key={item.value}>{item.text ?? item.value}</ListboxItem>
        ))}
      </Listbox>
    </div>
  );
}