import React, { useState, useEffect } from "react";
import {
  Listbox, ListboxItem, Drawer, DrawerContent, DrawerBody, DrawerFooter, Button, useDisclosure
} from "@heroui/react";
import Selection from "./Selection";

const listboxLabels = {
  AC: "Academic and Trade",
  HE: "Higher Education Textbooks",
  EL: "English Language Teaching",
  "*": "All",
  OX: "Children's and Pre University Educational",
  MU: "Printed Music"
};

const DisplayCard = ({ selectedValues = [], onSelectionChange, answers, updateAnswer }) => {
  const [selectedKeys, setSelectedKeys] = useState(new Set(selectedValues));
  const [selectedLabel, setSelectedLabel] = useState("Select option");
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    setSelectedKeys(new Set(selectedValues));
  }, [selectedValues]);

  const handleListboxChange = (keys) => {
    setSelectedKeys(keys);
    if (onSelectionChange) {
      onSelectionChange(Array.from(keys));
    }
    if (
    Array.from(keys).includes("EL") &&
    (!answers || !answers["selection-EL"] || answers["selection-EL"].length === 0)
  ) {
    updateAnswer("selection-EL", ["abc"]);
  }
    if (Array.from(keys).length > 0) {
      onOpen();
    }
  };

  const handleLeftSelectionChange = (parentKey, values, labels) => {
  updateAnswer(`selection-${parentKey}`, values);
  updateAnswer(`label-${parentKey}`, labels);
};

  const handleRightSelectionChange = (parentKey, childKey, values) => {
    updateAnswer(`rightSelection-${parentKey}-${childKey}`, values);
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold">Select Your Options</h2>
      <Listbox
      aria-label="Multiple selection"
      selectedKeys={selectedKeys}
      selectionMode="multiple"
      variant="flat"
      onSelectionChange={handleListboxChange}
    >
      {Object.entries(listboxLabels).map(([key, label]) => (
        <ListboxItem key={key}>{label}</ListboxItem>
      ))}
      </Listbox>
      <Drawer isOpen={isOpen} onOpenChange={() => {}} placement="top">
        <DrawerContent>
          <DrawerBody >
            {Array.from(selectedKeys).map((parentKey) => (       
  <div key={parentKey} className="whitespace-normal">
  {/* <div key={parentKey} className="gap-x-8"> */}
    <Selection
      
      selectedKey={parentKey}
      selectedValues={answers[`selection-${parentKey}`] || []}
      selectedlabel={listboxLabels[parentKey]}
      onSelectionChange={(values, labels) =>
        handleLeftSelectionChange(parentKey, values, labels)
      }
      fromleft = {true}
    />
  
 
  {answers[`selection-${parentKey}`]?.map((childKey) => {
    // console.log('child', childKey);
    // console.log('childsliced', childKey.slice(0, 4));    
    let slicedChildKey = childKey.slice(0, 4);
    if (slicedChildKey === 'ACHE'){
      slicedChildKey = childKey.slice(0, 6)
    }
if (slicedChildKey.startsWith("EL")) {
    return null; // prevents rendering <Selection />
  }
  
   let childLabel = childKey; 

if (parentKey === "EL" && childKey === "abc") {
  childLabel = "English Language Teaching"; // Hard-coded fallback for ELT
} else {
  const selectedKeys = answers[`selection-${parentKey}`] || [];
  const selectedLabels = answers[`label-${parentKey}`] || [];

  for (let i = 0; i < selectedKeys.length; i++) {
    if (selectedKeys[i] === childKey) {
      childLabel = selectedLabels[i];
      break;
    }
  }
}

    
    return (
              <Selection          
          selectedKey={slicedChildKey}
          selectedValues={
            answers[`rightSelection-${parentKey}-${childKey}`] || []
          }
          selectedlabel={childLabel}
          onSelectionChange={(values, labels) =>
            handleRightSelectionChange(parentKey, childKey, values, labels)
          }
        />
      
    );
  })}
  {/* </div> */}
 </div>
))}

          </DrawerBody>
          <DrawerFooter>
            <Button color="danger" variant="light" onPress={onClose}>Close</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default DisplayCard;
