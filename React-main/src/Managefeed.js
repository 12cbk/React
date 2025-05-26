import React from "react";
import {
  Listbox,
  ListboxItem,
  Drawer,
  DrawerContent,
  DrawerBody,
  DrawerFooter,
  Button,
  useDisclosure
} from "@heroui/react";
import Selection from "./Selection";

export const ListboxWrapper = ({ children }) => (
  <div className="flex flex-col gap-2">
    {children}
  </div>
);

export default function App() {
  const [selectedKeys, setSelectedKeys] = React.useState(new Set([]));
  const [selectionBoxes, setSelectionBoxes] = React.useState([]);
  const [rightselectionbox, setrightSelectionBoxes] = React.useState({});
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [activeItem, setActiveItem] = React.useState("");
  const [isCtrlPressed, setIsCtrlPressed] = React.useState(false);
  const pendingSelectionRef = React.useRef(false);

  React.useEffect(() => {
    if (isOpen) {
      setSelectedKeys(new Set(selectionBoxes)); // Restore selection state
    }
  }, [isOpen]);

  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Control") {
        setIsCtrlPressed(true);
      }
    };

    const handleKeyUp = (e) => {
      if (e.key === "Control") {
        setIsCtrlPressed(false);
        if (pendingSelectionRef.current) {
          pendingSelectionRef.current = false;
          onOpen();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [onOpen]);

  const addSelectionBox = (selectedKey, selectedValues) => {
    setrightSelectionBoxes((prev) => ({
      ...prev,
      [selectedKey]: selectedValues.length ? selectedValues : undefined, // Remove empty selections
    }));
  };

  const handleSelectionChange = (keys) => {
    const newKeys = Array.from(keys);

    setSelectedKeys(new Set(newKeys));

    setSelectionBoxes(prevBoxes => {
      const updatedBoxes = prevBoxes.filter(box => newKeys.includes(box)); // Remove unchecked items
      return [...new Set([...updatedBoxes, ...newKeys])]; // Add new ones while preventing duplicates
    });

    if (newKeys.length > 0) {  
      onOpen(); // Open the drawer when selections exist  
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <ListboxWrapper>
        <Listbox
          aria-label="Multiple selection example"
          selectedKeys={selectedKeys}
          selectionMode="multiple"
          variant="flat"
          onSelectionChange={handleSelectionChange}
        >
          <ListboxItem key="AC">Academic and Trade</ListboxItem>
          <ListboxItem key="HE">Higher Education Textbooks</ListboxItem>
          <ListboxItem key="EL">English Language Teaching</ListboxItem>
          <ListboxItem key="*">All</ListboxItem>
          <ListboxItem key="OX">Children's and Pre University Educational</ListboxItem>
          <ListboxItem key="MU">Printed Music</ListboxItem>
        </Listbox>
      </ListboxWrapper>

      <Drawer isOpen={isOpen} size="3xl" onOpenChange={onOpenChange} placement="left">
        <DrawerContent>
          {onClose => (
            <>
              <DrawerBody className="flex flex-col gap-4 overflow-auto">
                <div className="overflow-x-auto whitespace-nowrap flex flex-col gap-4">
                  {selectionBoxes.map((key, index) => (
                    <div key={index} className="flex gap-4">
                      <Selection selectedKey={key} onAddSelection={addSelectionBox} />
                      {rightselectionbox[key]?.map((rightKey, rightIndex) => (
                        <Selection key={rightIndex} selectedKey={rightKey} />
                      ))}
                    </div>
                  ))}
                </div>
              </DrawerBody>

              <DrawerFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Apply
                </Button>
              </DrawerFooter>
            </>
          )}
        </DrawerContent>
      </Drawer>
    </div>
  );
}
