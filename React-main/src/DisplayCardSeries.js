import React, { useState, useEffect } from "react";
import {
  Listbox, ListboxItem, Drawer, DrawerContent, DrawerBody, DrawerFooter, Button, useDisclosure
} from "@heroui/react";
import Selection from "./Selection";

const DisplayCardSeries = ({ selectedValues = [], onSelectionChange, answers, updateAnswer }) => {
    const [selectedKeys, setSelectedKeys] = useState(new Set(selectedValues));
    const { isOpen, onOpen, onClose } = useDisclosure();

    const handleselection = (parentKey, values) => {
    
    updateAnswer(`series-${parentKey}`, values);
  }

    const handleListboxChange = (keys) => {
    setSelectedKeys(keys);
    if (onSelectionChange) {
      onSelectionChange(Array.from(keys));
    }
    if (Array.from(keys).length > 0) {
      onOpen();
    }

    
  };
    return (
        <div className="p-4">
          <h2 className="text-lg font-semibold">Select Your Series</h2>
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
    <Selection      
      selectedKey={parentKey}
      selectedValues={answers[`series-${parentKey}`] || []}
    onSelectionChange={(values) =>
        handleselection(parentKey, values)
        
      }    
        type = 'series'   
    /> 
     </div>
))}
      
          </DrawerBody>
          <DrawerFooter>
                      <Button color="danger" variant="light" onPress={onClose}>Close</Button>
                    </DrawerFooter>
          </DrawerContent>
          </Drawer>

          </div>
          )
};

export default DisplayCardSeries;