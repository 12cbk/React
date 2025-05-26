import React from "react";
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
import { SelectionProvider, useSelection } from "./Context";

function AppContent() {
  const {
    selectedKeys,
    setSelectedKeys,
    selectionBoxes,
    setSelectionBoxes,
    rightSelectionBox,
    addSelectionBox,
  } = useSelection();

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isCtrlPressed, setIsCtrlPressed] = React.useState(false);
  const pendingSelectionRef = React.useRef(false);

  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Control") setIsCtrlPressed(true);
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

  const handleSelectionChange = (keys) => {
    const newKeys = Array.from(keys);
    const newlySelected = newKeys.find((key) => !selectedKeys.has(key));

    setSelectedKeys(new Set(keys));
    setSelectionBoxes((prev) => prev.filter((box) => newKeys.includes(box)));

    if (newlySelected) {
      setSelectionBoxes((prev) => [...prev, newlySelected]);

      if (isCtrlPressed) {
        pendingSelectionRef.current = true;
      } else {
        onOpen();
      }
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <Listbox
        aria-label="Multiple selection example"
        selectedKeys={selectedKeys}
        selectionMode="multiple"
        >
        {[
          { key: "AC", label: "Academic and Trade" },
          { key: "HE", label: "Higher Education Textbooks" },
          { key: "EL", label: "English Language Teaching" },
          { key: "*", label: "All" },
          { key: "OX", label: "Children's and Pre University Educational" },
          { key: "MU", label: "Printed Music" },
        ].map(({ key, label }) => (
          <ListboxItem key={key}>{label}</ListboxItem>
        ))}
      </Listbox>

      <Drawer isOpen={isOpen} size="3xl" onOpenChange={onOpenChange} placement="left">
        <DrawerContent>
          {(onClose) => (
            <>
              <DrawerBody className="flex flex-col gap-4 overflow-auto">
                <div className="overflow-x-auto whitespace-nowrap flex flex-col gap-4">
                  {selectionBoxes.map((key) => (
                    <div key={key} className="flex gap-4">
                      <Selection selectedKey={key} onAddSelection={addSelectionBox} />
                      {rightSelectionBox[key]?.map((rightKey) => (
                        <Selection key={`${key}-${rightKey}`} selectedKey={rightKey} />
                      ))}
                    </div>
                  ))}
                </div>
              </DrawerBody>
              <DrawerFooter>
                <Button color="danger" variant="light" onPress={onClose}>Close</Button>
                <Button color="primary" onPress={onClose}>Apply</Button>
              </DrawerFooter>
            </>
          )}
        </DrawerContent>
      </Drawer>
    </div>
  );
}

export default function App() {
  return (
    <SelectionProvider>
      <AppContent />
    </SelectionProvider>
  );
}
