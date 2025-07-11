import { Select, SelectItem } from "@heroui/react";
import React, { useEffect, useState } from "react";
import { fetchData } from "./ApiService";
import formatFeedRequirements from  './Formatfeed'

const Selection = ({ selectedKey, selectedValues, onSelectionChange, fromleft = false , type = 'Subject'}) => {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        // console.log('values before',selectedKey);
        // let keyToUse = fromRight ? selectedKey.slice(1, 4) : selectedKey;        
        let keyToUse =  selectedKey;  
        let html;
        let doc;
        let optionElements;      
        if (keyToUse === 'HE') 
          {            
            keyToUse = "ACHE"
          }
          let response;
         if(type=== 'Subject')
          { 
            console.log('abcd',keyToUse)
            console.log('aaaaa',fromleft)
            
          if (keyToUse==='abc' && fromleft === false) 
            {
             console.log('bbb',keyToUse)
             const extractedData = await fetchData("ELT");               
                optionElements = extractedData.map(item => {
      const opt = document.createElement("option");
      opt.value = item.value;
      opt.textContent = item.text;
      return opt;
      
    });
    console.log("optionElements (from API):", optionElements);                
              
              
          } 
          else {
             response = await fetch(`./Subject${keyToUse}.html`);
             console.log('normal data', response)
             html = await response.text();
            doc = new DOMParser().parseFromString(html, "text/html");
            optionElements = doc.querySelectorAll("select[name='test'] option");
            console.log('optionelement', optionElements);
          }          
         }

         if(type=== 'series'){ 
         response = await fetch(`./Series${keyToUse}.html`);
          html = await response.text();
            doc = new DOMParser().parseFromString(html, "text/html");
            optionElements = doc.querySelectorAll("select[name='test'] option");
         }
        

        setOptions(
          Array.from(optionElements).map((opt) => ({
            key: opt.value,
            label: opt.textContent,            
          }))
        );
      
        
      } catch (err) {
        console.error(`Error fetching options for ${selectedKey}:`, err);
      }
    };

    fetchOptions();   
    
  }, [selectedKey, fromleft]); 
  
    
  console.log('optionsvalue', options);
  options.forEach((option) => {
      // console.log("Value:", option.key, "Text:", option.label);
    });
  return (
    // <div className="w-[300px] flex-shrink-0">
      // <h4 className="text-lg font-bold">{selectedKey} Options</h4>
      <Select
      className="max-w-xs"
        label={ selectedKey||"Select options"}
        selectionMode="multiple"
        color="primary"
        selectedKeys={new Set(selectedValues)}
        onSelectionChange={(keys) => onSelectionChange(Array.from(keys))}
      >
        {options.map(({ key, label }) => (
          
          <SelectItem key={key} value={key}>
            {label}
          </SelectItem>
          
        ))}
      </Select>
    // </div>
  );
};

export default Selection;
