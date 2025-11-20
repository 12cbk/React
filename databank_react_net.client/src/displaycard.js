
import React, { useState, useEffect, useCallback } from "react";
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
import Selection, { optionsCache } from "./Selection";
import { Divider } from "@heroui/react";

const listboxLabels = {
  AC: "Academic and Trade",
  HE: "Higher Education Textbooks",
  EL: "English Language Teaching",
  "*": "All",
  OX: "Children's and Pre University Educational",
  MU: "Printed Music",
};

const DisplayCard = ({ selectedValues = [], onSelectionChange, answers = {}, updateAnswer }) => {
  const [selectedKeys, setSelectedKeys] = useState(new Set(selectedValues));
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [ctrlPressed, setCtrlPressed] = useState(false);

  useEffect(() => {
    setSelectedKeys(new Set(selectedValues));
  }, [selectedValues]);

  // Helpers
  const normalize = (keys) => Array.from(keys || []);
  const clearParentSelections = useCallback((parentKey) => {
    updateAnswer(`selection-${parentKey}`, []);
    updateAnswer(`label-${parentKey}`, []);
    Object.keys(answers).forEach((k) => {
      if (k.startsWith(`selection-right-${parentKey}-`)) updateAnswer(k, []);
    });
  }, [answers, updateAnswer]);

  // Ctrl/Meta handling: suppress opening while held, open when released
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Control" || e.key === "Meta") setCtrlPressed(true);
    };
    const onKeyUp = (e) => {
      if (e.key === "Control" || e.key === "Meta") {
        setCtrlPressed(false);
        const keysArr = normalize(selectedKeys);
        if (keysArr.length > 0 && !keysArr.includes("*")) onOpen();
        else onClose();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
    };
  }, [selectedKeys, onOpen, onClose]);

  

  const handleListboxChange = (keys) => {
    const incoming = normalize(keys);
    // persist selection
    setSelectedKeys(keys);
    if (onSelectionChange) onSelectionChange(incoming);
    console.log("Incoming selection:", incoming);
    // preserve EL special-case
    if (incoming.includes("EL") && (!answers["selection-EL"] || answers["selection-EL"].length === 0)) {
      updateAnswer("selection-EL", ["abc"]);
    }

    const prev = normalize(selectedKeys);
    const prevHasAll = prev.includes("*");
    const incomingHasAll = incoming.includes("*");

    // Case A: user newly selected '*' -> make '*' only and clear each parent's stored selections
    if (incomingHasAll && !prevHasAll) {
      const newSet = new Set(["*"]);
      setSelectedKeys(newSet);
      if (onSelectionChange) onSelectionChange(Array.from(newSet));
      Object.keys(listboxLabels).filter(k => k !== "*").forEach(clearParentSelections);
      onClose();
      return;
    }

    // Case B: prev had '*' and incoming also has '*'
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
        if (filtered.length === 0) onClose();
        else if (!ctrlPressed) onOpen();
        return;
      }
    }

    // Case C: normal behavior (no '*')
    if (incoming.length === 0) onClose();
    else if (!ctrlPressed) onOpen();
  };

  
  const handleLeftSelectionChange = (parentKey, values = [], labels = []) => {
    const prevValues = answers[`selection-${parentKey}`] || [];
    const incoming = normalize(values);
    const prevHasAll = prevValues.includes("*");
    const incomingHasAll = incoming.includes("*");
console.log("Left selection change for", parentKey, "incoming:", incoming, "labels:", labels);
    let finalValues;
    let finalLabels = Array.isArray(labels) ? [...labels] : [];

    if (incomingHasAll && !prevHasAll && parentKey !== "EL") {
      finalValues = ["*"];
      const idx = incoming.indexOf("*");
      finalLabels = finalLabels.length ? [finalLabels[idx] ?? "*"] : finalLabels;
      // clear child/right selections for this parent
      Object.keys(answers).forEach((k) => {
        if (k.startsWith(`selection-right-${parentKey}-`)) updateAnswer(k, []);
      });
    } else if (incomingHasAll && prevHasAll) {
      if (incoming.length === 1) {
        finalValues = ["*"];
        const idx = incoming.indexOf("*");
        finalLabels = finalLabels.length ? [finalLabels[idx] ?? "*"] : finalLabels;
        Object.keys(answers).forEach((k) => {
          if (k.startsWith(`selection-right-${parentKey}-`)) updateAnswer(k, []);
        });
      } else {
        finalValues = incoming.filter(k => k !== "*");
        if (finalLabels.length) {
          finalLabels = incoming
            .map((v, i) => ({ v, lab: labels[i] }))
            .filter(item => item.v !== "*")
            .map(item => item.lab);
        }
      }
    } else if (!incomingHasAll && prevHasAll) {
      finalValues = incoming.filter(k => k !== "*");
      if (finalLabels.length) {
        finalLabels = incoming
          .map((v, i) => ({ v, lab: labels[i] }))
          .filter(item => item.v !== "*")
          .map(item => item.lab);
      }
    } else {
      finalValues = incoming;
      if (finalLabels.length) finalLabels = incoming.map((v, i) => labels[i]);
    }

    updateAnswer(`selection-${parentKey}`, finalValues);
    if (Array.isArray(labels)) updateAnswer(`label-${parentKey}`, finalLabels);
  };

  const handleRightSelectionChange = (parentKey, childKey, values) => {
    updateAnswer(`selection-right-${parentKey}-${childKey}`, normalize(values));
  };

   // ...existing code...
  const handleViewClick = useCallback(async () => {
    // determine parent keys to act on: prefer current selectedKeys, fallback to answers.displayCardSelection
    const parents = normalize(selectedKeys).length ? normalize(selectedKeys) : (Array.isArray(answers.displayCardSelection) ? answers.displayCardSelection : []);
    // call listbox handler to ensure parent state logic runs
    handleListboxChange(new Set(parents));

    // use for..of so we can await inside the loop
    for (const p of parents) {
      const leftValues = answers[`selection-${p}`] || [];

      // ensure cache: if missing, fetch the Subject HTML and populate a minimal options list
      const cacheKey = p + "Subject";
      let cachedLeft = optionsCache.get(cacheKey) || [];
      if (cachedLeft.length === 0 && leftValues.length > 0) {
        try {
          const keyToUse = p === "HE" ? "ACHE" : p;
          const resp = await fetch(`./Subject${keyToUse}.html`);
          const txt = await resp.text();
          const doc = new DOMParser().parseFromString(txt, "text/html");
          const optionEls = doc.querySelectorAll("select[name='test'] option");
          const formatted = [
            { key: "*", label: "All" },
            ...Array.from(optionEls).map(o => ({ key: o.value, label: o.textContent }))
          ];
          optionsCache.set(cacheKey, formatted);
          cachedLeft = formatted;
        } catch (err) {
          console.warn("Failed to preload options for", p, err);
        }
      }

      console.log("For parent", p, "leftValues:", leftValues, "cachedLeft:", cachedLeft);
      const storedLeftLabels = answers[`label-${p}`] || [];
      const leftLabels = leftValues.map((k, i) => {
        const found = cachedLeft.find(o => o.key === k);
        return found ? found.label : (storedLeftLabels[i] || k);
      });
      handleLeftSelectionChange(p, leftValues, leftLabels);

      // for each child under this parent call right handler
      for (const childKey of leftValues || []) {
        const rightValues = answers[`selection-right-${p}-${childKey}`] || [];

        // attempt to build right labels if needed (compute sliced child key same as render logic)
        let slicedChildKey = childKey.slice(0, 4);
        if (slicedChildKey === "ACHE") slicedChildKey = childKey.slice(0, 6);
        const cachedRight = optionsCache.get(slicedChildKey + "Subject") || [];
        // optionally compute right labels (not used by current handler signature) — keep for future use
        const rightLabels = rightValues.map((rv, i) => cachedRight.find(o => o.key === rv)?.label || rv);
        // call right handler (current signature only accepts values)
        handleRightSelectionChange(p, childKey, rightValues);
      }
    }

    // finally open the drawer so selections are visible
    onOpen();
  }, [selectedKeys, answers, handleListboxChange, handleLeftSelectionChange, handleRightSelectionChange, onOpen]);
// ...existing code...
  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold">Select Your Options</h2>
      <Button color="primary" variant="flat" onPress={handleViewClick} aria-label="View selections">View</Button>
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
          <DrawerBody>
            {normalize(selectedKeys).map((parentKey) => (
              
              <div key={parentKey} className="whitespace-normal">
                <Selection
                  selectedKey={parentKey}
                  selectedValues={answers[`selection-${parentKey}`] || []}
                  selectedlabel={listboxLabels[parentKey]}
                  onSelectionChange={(values, labels) => handleLeftSelectionChange(parentKey, values, labels)}
                  fromleft={true}
                />

                {(answers[`selection-${parentKey}`] || []).map((childKey) => {
                  let slicedChildKey = childKey.slice(0, 4);
                  if (slicedChildKey === "ACHE") slicedChildKey = childKey.slice(0, 6);
                  if (slicedChildKey.startsWith("EL") || childKey === "*") return null;

                  let childLabel = childKey;
                  if (parentKey === "EL" && childKey === "abc") childLabel = "English Language Teaching";
                  else {
                    const selectedKeysForParent = answers[`selection-${parentKey}`] || [];
                    const selectedLabels = answers[`label-${parentKey}`] || [];
                    for (let i = 0; i < selectedKeysForParent.length; i++) {
                      if (selectedKeysForParent[i] === childKey) {
                        childLabel = selectedLabels[i];
                        break;
                      }
                    }
                  }

                  return (
                    <Selection
                      key={slicedChildKey}
                      selectedKey={slicedChildKey}
                      selectedValues={answers[`selection-right-${parentKey}-${childKey}`] || []}
                      selectedlabel={childLabel}
                      onSelectionChange={(values, labels) => handleRightSelectionChange(parentKey, childKey, values)}
                    />
                  );
                })}
                    <Divider className="my-4" />
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