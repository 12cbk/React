// ...existing code...
import React, { useState, useEffect } from "react";
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

const SERIES_LABELS = {
  AC: "Academic and Trade",
  HE: "Higher Education Textbooks",
  EL: "English Language Teaching",
  "*": "All",
  OX: "Children's and Pre University Educational",
  MU: "Printed Music",
};

const DisplayCardSeries = ({ selectedValues = [], onSelectionChange, answers, updateAnswer }) => {
  const [selectedKeys, setSelectedKeys] = useState(new Set(selectedValues));
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [ctrlPressed, setCtrlPressed] = useState(false);

  // watch Ctrl (and Meta for mac keyboards) so we can suppress opening while user holds it
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Control" || e.key === "Meta") {
        setCtrlPressed(true);
      }
    };
    const onKeyUp = (e) => {
      if (e.key === "Control" || e.key === "Meta") {
        setCtrlPressed(false);
        // when user releases Ctrl/Meta, open the drawer if there are selections (and not "All")
        const keysArr = Array.from(selectedKeys);
        if (keysArr.length > 0 && !keysArr.includes("*")) {
          onOpen();
        } else {
          onClose();
        }
      }
    };
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
    };
  }, [selectedKeys, onOpen, onClose]);
  
  const handleselection = (parentKey, values) => {
    updateAnswer(`series-${parentKey}`, values);
  };

  // Make "*" (All) mutually exclusive:
  // - Clicking "*" (when it wasn't selected) should clear other selections and select only "*".
  // - If "*" is selected and user clicks any other option, "*" should be removed and the other options should be selected.
  const handleListboxChange = (keys) => {
    const incoming = Array.from(keys || []);
    const prev = Array.from(selectedKeys);

    const prevHasAll = prev.includes("*");
    const incomingHasAll = incoming.includes("*");

    // Case A: user newly selected "*" (prev did not have "*", incoming does) -> make "*" the only selection
    if (incomingHasAll && !prevHasAll) {
      const newSet = new Set(["*"]);
      setSelectedKeys(newSet);
      if (onSelectionChange) onSelectionChange(Array.from(newSet));
      // always close when selecting All
      onClose();
      return;
    }

    // Case B: prev had "*" and incoming also has "*" 
    // - if incoming length === 1 => still only "*" -> keep it
    // - if incoming length > 1 => user added others while "*" was present -> remove "*" and keep others
    if (incomingHasAll && prevHasAll) {
      if (incoming.length === 1) {
        const newSet = new Set(["*"]);
        setSelectedKeys(newSet);
        if (onSelectionChange) onSelectionChange(Array.from(newSet));
        onClose();
        return;
      } else {
        const filtered = incoming.filter(k => k !== "*");
        const newSet = new Set(filtered);
        setSelectedKeys(newSet);
        if (onSelectionChange) onSelectionChange(Array.from(newSet));
        // only open if ctrl is NOT held
        if (filtered.length === 0) onClose(); else if (!ctrlPressed) onOpen();
        return;
      }
    }

    // Case C: incoming does not include "*" (normal behavior)
    // This covers selecting other options when "*" was previously selected (incoming won't contain "*")
    const newSet = new Set(incoming);
    setSelectedKeys(newSet);
    if (onSelectionChange) onSelectionChange(Array.from(newSet));

    if (incoming.length === 0) {
      onClose();
    } else {
      // suppress opening while Ctrl/Meta is held so user can multi-select
      if (!ctrlPressed) onOpen();
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
          <DrawerBody>
            {Array.from(selectedKeys).map((parentKey) => (
              <div key={parentKey} className="whitespace-normal">
                <Selection
                  selectedKey={parentKey}
                  selectedValues={answers[`series-${parentKey}`] || []}
                  selectedlabel={SERIES_LABELS[parentKey] || parentKey}
                  onSelectionChange={(values) => handleselection(parentKey, values)}
                  type="series"
                />
              </div>
            ))}
          </DrawerBody>
          <DrawerFooter>
            <Button color="danger" variant="light" onPress={onClose}>
              Close
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default DisplayCardSeries;
