import React, { useState, useEffect } from "react";
import {
  Listbox, ListboxItem, Drawer, DrawerContent, DrawerBody, DrawerFooter, Button, useDisclosure
} from "@heroui/react";
import Selection from "./Selection";

const DisplayCard = ({ selectedValues = [], onSelectionChange, answers, updateAnswer }) => {
  const [selectedKeys, setSelectedKeys] = useState(new Set(selectedValues));
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

  const handleLeftSelectionChange = (parentKey, values) => {
    
    updateAnswer(`selection-${parentKey}`, values);
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
        <ListboxItem key="AC">Academic and Trade</ListboxItem>
        <ListboxItem key="HE">Higher Education Textbooks</ListboxItem>
        <ListboxItem key="EL">English Language Teaching</ListboxItem>
        <ListboxItem key="*">All</ListboxItem>
        <ListboxItem key="OX">Children's and Pre University Educational</ListboxItem>
        <ListboxItem key="MU">Printed Music</ListboxItem>
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
      onSelectionChange={(values) =>
        handleLeftSelectionChange(parentKey, values)
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
    
    return (
              <Selection          
          selectedKey={slicedChildKey}
          selectedValues={
            answers[`rightSelection-${parentKey}-${childKey}`] || []
          }
          onSelectionChange={(values) =>
            handleRightSelectionChange(parentKey, childKey, values)
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
