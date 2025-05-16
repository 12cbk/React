import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerBody,
    DrawerFooter,
    Button,
    useDisclosure,
  } from "@heroui/react";
  import React from "react";
import {Select, SelectItem} from "@heroui/react";
  
  export default function Displaycard() {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [values, setValues] = React.useState(new Set([""]));
     const animals = [
        {key: "cat", label: "Cat"},
        {key: "dog", label: "Dog"},
        {key: "elephant", label: "Elephant"},
        {key: "lion", label: "Lion"},
        {key: "tiger", label: "Tiger"},
        {key: "giraffe", label: "Giraffe"},
        {key: "dolphin", label: "Dolphin"},
        {key: "penguin", label: "Penguin"},
        {key: "zebra", label: "Zebra"},
        {key: "shark", label: "Shark"},
        {key: "whale", label: "Whale"},
        {key: "otter", label: "Otter"},
        {key: "crocodile", label: "Crocodile"},
      ];
  
    return (
      <>
        <Button onPress={onOpen}>Open Drawer</Button>
        <Drawer isOpen={isOpen} onOpenChange={onOpenChange}>
          <DrawerContent>
            {(onClose) => (
              <>
                <DrawerHeader className="flex flex-col gap-1">Drawer Title</DrawerHeader>
                <DrawerBody>
                <div className="flex w-full max-w-xs flex-col gap-2">
      <Select
        className="max-w-xs"
        label="Favorite Animal"
        placeholder="Select an animal"
        selectedKeys={values}
        selectionMode="multiple"
        onSelectionChange={setValues}
      >
        {animals.map((animal) => (
          <SelectItem key={animal.key}>{animal.label}</SelectItem>
        ))}
      </Select>
      <p className="text-small text-default-500">Selected: {Array.from(values).join(", ")}</p>
      <Select
        className="max-w-xs"
        label="Favorite Animal"
        placeholder="Select an animal"
        selectedKeys={values}
        selectionMode="multiple"
        onSelectionChange={setValues}
      >
        {animals.map((animal) => (
          <SelectItem key={animal.key}>{animal.label}</SelectItem>
        ))}
      </Select>
      <p className="text-small text-default-500">Selected: {Array.from(values).join(", ")}</p>
      
    </div>
                </DrawerBody>
                <DrawerFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Close
                  </Button>
                  <Button color="primary" onPress={onClose}>
                    Action
                  </Button>
                </DrawerFooter>
              </>
            )}
          </DrawerContent>
        </Drawer>
      </>
    );
  }
  