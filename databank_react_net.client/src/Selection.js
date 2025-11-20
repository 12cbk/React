import React, { useEffect, useState } from "react";
import { FormControl, InputLabel, Select, MenuItem, Chip, Box, OutlinedInput } from "@mui/material";

export const optionsCache = new Map();

const Selection = ({
    selectedKey,
    selectedValues,
    selectedlabel,
    onSelectionChange,
    fromleft = false,
    type = "Subject"
}) => {
    const [options, setOptions] = useState([]);

    useEffect(() => {
        const fetchOptions = async () => {
            let keyToUse = selectedKey === "HE" ? "ACHE" : selectedKey;
            try {
                console.log("type", type);
                if (optionsCache.has(type)) {
                    const acArray = optionsCache.get(type);
                    const ary = acArray[keyToUse];
                    console.log("acarray", ary);

                    const formattedOptions = [
                        { value: "*", label: "All" },
                        ...ary
                            .filter(item => item.value.replace(/0+$/, '') !== keyToUse.replace(/0+$/, ''))
                            .map(item => ({
                                value: item.value,
                                label: item.label
                            }))
                    ];

                    setOptions(formattedOptions);
                    return;
                }

                let optionElements = [];

                if (type === "Subject") {
                    if (keyToUse === "abc" && !fromleft) {
                        const API = "http://localhost:3000" ;
                        const category = "ELT";
                        const res = await fetch(`${API}/api/options?category=${encodeURIComponent(category)}`);
                        if (!res.ok) throw new Error("Network error");
                        const extractedData = await res.json();
                        console.log("Fetched ELTT options from API:", extractedData);

                        optionElements = extractedData.map(item => {
                            const opt = document.createElement("option");
                            opt.value = item.value;
                            opt.textContent = item.text;
                            return opt;
                        });
                    } else {
                        const API = "http://localhost:3000";
                        const res = await fetch(`${API}/api/flexiblecode/${type}`);
                        if (!res.ok) throw new Error("Network error");
                        const extractedData = await res.json();
                        console.log("Fetched Series options from API:", extractedData);
                        optionsCache.set(type, extractedData);
                    }
                }

                if (type === "series") {
                    const API = "http://localhost:3000";
                    const res = await fetch(`${API}/api/flexiblecode/${type}`);
                    if (!res.ok) throw new Error("Network error");
                    const extractedData = await res.json();
                    console.log("Fetched Series options from API:", extractedData);
                    optionsCache.set(type, extractedData);
                }

                const acArray = optionsCache.get(type);
                const ary = acArray[keyToUse];
                console.log("acarray", ary);

                const formattedOptions = [
                    { value: "*", label: "All" },
                    ...ary
                        .filter(item => item.value.replace(/0+$/, '') !== keyToUse.replace(/0+$/, ''))
                        .map(item => ({
                            value: item.value,
                            label: item.label
                        }))
                ];

                console.log("Cached options for", selectedKey + type, ":", formattedOptions);
                setOptions(formattedOptions);

            } catch (err) {
                console.error(`Error fetching options for ${selectedKey}:`, err);
            }
        };

        fetchOptions();
    }, [selectedKey, fromleft, type]);

    const handleSelection = (event) => {
        const selectedKeys = event.target.value;
        const prevHasAbc = (selectedValues || []).includes("abc");
        const incomingHasAll = selectedKeys.includes("*");

        let finalKeys;

        // If "All" is selected, keep only "All" and "abc" (if it was there)
        if (incomingHasAll) {
            finalKeys = prevHasAbc ? ["*", "abc"] : ["*"];
        } else {
            // Filter out "All" if other items are selected
            finalKeys = selectedKeys.filter(k => k !== "*");
            // Always preserve "abc" if it was there
            if (prevHasAbc && !finalKeys.includes("abc")) {
                finalKeys.push("abc");
            }
        }

        const selectedLabels = finalKeys.map(k =>
            options.find(opt => opt.value === k)?.label || k
        );

        console.log("Selected keys:", finalKeys, "Selected labels:", selectedLabels);
        onSelectionChange(finalKeys, selectedLabels);
    };

    return (
        <FormControl sx={{ maxWidth: 320, width: '100%' }}>
            <InputLabel
                id={`${selectedKey}-label`}
                shrink={selectedValues && selectedValues.filter(v => v !== 'abc').length > 0}
            >
                {selectedlabel}
            </InputLabel>
            <Select
                labelId={`${selectedKey}-label`}
                multiple
                value={selectedValues || []}
                onChange={handleSelection}
                input={<OutlinedInput label={selectedlabel} />}
                renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {selected
                            .filter(value => value !== 'abc')
                            .map((value) => {
                                const option = options.find(opt => opt.value === value);
                                return (
                                    <Chip
                                        key={value}
                                        label={option?.label || value}
                                        size="small"
                                        color="primary"
                                    />
                                );
                            })}
                    </Box>
                )}
                MenuProps={{
                    // Completely disable all focus management
                    disableAutoFocus: true,
                    disableAutoFocusItem: true,
                    disableEnforceFocus: true,
                    disableRestoreFocus: true,
                    // Render in DOM hierarchy instead of portal
                    disablePortal: true,
                    PaperProps: {
                        style: {
                            maxHeight: 300,
                        },
                        // Prevent any focus on the paper element
                        onFocus: (e) => e.stopPropagation(),
                    },
                    MenuListProps: {
                        autoFocus: false,
                        autoFocusItem: false,
                        disablePadding: false,
                    },
                    anchorOrigin: {
                        vertical: 'bottom',
                        horizontal: 'left',
                    },
                    transformOrigin: {
                        vertical: 'top',
                        horizontal: 'left',
                    },
                }}
                // Prevent focus on the select itself during menu operations
                onFocus={(e) => {
                    // Allow initial focus but prevent re-focusing
                    if (document.activeElement === e.currentTarget) {
                        return;
                    }
                }}
            >
                {options.map(({ value, label }) => (
                    <MenuItem key={value} value={value}>
                        {label}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default Selection;