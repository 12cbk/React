import React, { createContext, useContext, useState } from "react";

const SelectionContext = createContext();

export const SelectionProvider = ({ children }) => {
  const [selectedKeys, setSelectedKeys] = useState(new Set());
  const [selectionBoxes, setSelectionBoxes] = useState([]);
  const [rightSelectionBox, setRightSelectionBox] = useState({});

  const addSelectionBox = (selectedKey, selectedValues) => {
    setRightSelectionBox((prev) => ({
      ...prev,
      [selectedKey]: selectedValues.length ? selectedValues : undefined,
    }));
  };

  return (
    <SelectionContext.Provider
      value={{
        selectedKeys,
        setSelectedKeys,
        selectionBoxes,
        setSelectionBoxes,
        rightSelectionBox,
        addSelectionBox,
      }}
    >
      {children}
    </SelectionContext.Provider>
  );
};

export const useSelection = () => useContext(SelectionContext);
