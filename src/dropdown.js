import React from 'react';
import './dropdown.css';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from '@heroui/react';

const Dropdowncomp = ({ label, values, dropdownlabel, selectedValue, onSelectChange }) => {
  const [selectedKeys, setSelectedKeys] = React.useState(new Set([selectedValue || ""]));

  const handleSelectionChange = (keys) => {
    const key = Array.from(keys)[0];
    setSelectedKeys(new Set([key]));

    const selectedItem = values.find(item => item.value === key);
    if (onSelectChange && selectedItem) {
      onSelectChange(key, selectedItem.text);
    }
  };

  const displayedLabel =
    values.find(item => item.value === Array.from(selectedKeys)[0])?.text || "Select an option";

  return (
    <div className="dropdown-container">
      {label && <label className="dropdown-label">{label}</label>}

      <div className="dropdown-row">
        {dropdownlabel && <span className="field-name">{dropdownlabel}</span>}

        <Dropdown>
          <DropdownTrigger>
            <Button className="capitalize" variant="bordered">
              {displayedLabel}
            </Button>
          </DropdownTrigger>

          <DropdownMenu
            disallowEmptySelection
            aria-label="Single selection example"
            selectedKeys={selectedKeys}
            selectionMode="single"
            variant="flat"
            onSelectionChange={handleSelectionChange}
          >
            {values.map((item) => (
              <DropdownItem key={item.value}>{item.text}</DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
      </div>
    </div>
  );
};

export default Dropdowncomp;