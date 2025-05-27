import React, { useState } from "react";
import {
  Listbox,
  ListboxItem,
  Drawer,
  DrawerContent,
  DrawerBody,
  DrawerFooter,
  Button,
  useDisclosure,
} from "@heroui/react";
import Selection from "./Selection";

export default function DisplayCard() {
  const [selectedKeys, setSelectedKeys] = useState(new Set());
  const [drawerKeys, setDrawerKeys] = useState([]);
  const [selections, setSelections] = useState({});
  const [nestedSelections, setNestedSelections] = useState({});

  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  console.log("Selected Keys:", selections);
  const handleListboxChange = (keys) => {
    const newKeys = Array.from(keys);
    const oldKeys = Array.from(selectedKeys);
    const newlySelected = newKeys.find((key) => !oldKeys.includes(key));

    setSelectedKeys(new Set(newKeys));

    if (newlySelected) {
      setDrawerKeys((prev) =>
        prev.includes(newlySelected) ? prev : [...prev, newlySelected]
      );
      onOpen();
    }
  };

  const handleMainSelectionChange = (key, values) => {
    setSelections((prev) => ({
      ...prev,
      [key]: values,
    }));
    console.log(`Main selection changed for ${key}:`, values);
  };

  const handleNestedSelectionChange = (slicedKey, nestedValues) => {
    setNestedSelections((prev) => ({
      ...prev,
      [slicedKey]: nestedValues,
    }));
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Select Options</h2>
      <Listbox
        aria-label="Multiple selection"
        selectedKeys={selectedKeys}
        selectionMode="multiple"
        onSelectionChange={handleListboxChange}
      >
        <ListboxItem key="AC">Academic and Trade</ListboxItem>
        <ListboxItem key="HE">Higher Education Textbooks</ListboxItem>
        <ListboxItem key="EL">English Language Teaching</ListboxItem>
        <ListboxItem key="*">All</ListboxItem>
        <ListboxItem key="OX">Children's and Pre University Educational</ListboxItem>
        <ListboxItem key="MU">Printed Music</ListboxItem>
      </Listbox>

      <Drawer isOpen={isOpen} onOpenChange={onOpenChange} size="3xl" placement="left">
        <DrawerContent>
          <DrawerBody className="flex gap-4 overflow-x-auto">
            {drawerKeys.map((key) => (
              <div key={key} className="flex gap-4">
                <Selection
                  selectedKey={key}
                  selectedValues={selections[key] || []}
                  onSelectionChange={(values) => handleMainSelectionChange(key, values)}
                />
                {selections[key]?.map((nestedKey) => {
                  const slicedKey = nestedKey.slice(0,4);
                  console.log("abcd", nestedKey) 
                  console.log("abcdesl", slicedKey) // Slicing logic here
                  return (
                    <Selection
                      key={slicedKey}
                      selectedKey={slicedKey}
                      selectedValues={nestedSelections[slicedKey] || []}
                      onSelectionChange={(nestedValues) =>
                        handleNestedSelectionChange(slicedKey, nestedValues)
                      }
                    />
                  );
                })}
              </div>
            ))}
          </DrawerBody>
          <DrawerFooter>
            <Button color="danger" variant="light" onPress={onClose}>
              Close
            </Button>
            <Button color="primary" onPress={onClose}>
              Apply
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
