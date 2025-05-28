import React, { useState, useEffect } from "react";
import formatFeedRequirements from  './Formatfeed'
import { Pagination, Button, Checkbox } from "@heroui/react";
import Radiogroup from "./Radiogroup";
 import feedrequirements from "./Feedrequirements";
import Dropdown from "./dropdown";
import "./Managefeed.css";
import Textbox from "./textbox";
import { fetchData } from "./ApiService";
import Checkboxgroup from "./checkbox";
import DisplayCard from "./displaycard";
import MultiLineInput from "./MultiLineInput";

const Card = () => {
  const [page, setPage] = useState(0); 
  const [answers, setAnswers] = useState({});
  const [feedrequirement, setFeedRequirements] = useState(feedrequirements);
  const questionsPerPage = 3;   
  const startIndex = page * questionsPerPage;
  console.log("answers:", answers);
  // useEffect(() => {
  //   fetchData().then((extractedData) => {
  //     let formattedData = formatFeedRequirements(extractedData);
  //     console.log("Format Data:", formattedData);
  //     setFeedRequirements((prev) => [...prev, ...formattedData]);
  //     console.log("feed Data:", feedrequirement);
  //   });
  // }, []);

  const handlePageChange = (direction) => {
    console.log("length:",visibleQuestions.length);
    setPage((prevPage) => {
      const newPage = direction === "next" ? prevPage + 1 : prevPage - 1;
      return Math.max(0, Math.min(newPage, Math.ceil(visibleQuestions.length / questionsPerPage) - 1));
    });
  };
  
   
    const updateAnswer = (name, selectedValue) => {
      setAnswers((prevAnswers) => ({
        ...prevAnswers,
        [name]: selectedValue,
      }));
      console.log(answers);
      };
    
// const visibleQuestions = feedrequirement.filter((question) => {
//   if (!question.dependency) {return true; }
//   const [parentName, expectedValue] = question.dependency.split("-");
//   const isVisible =  answers[parentName] === expectedValue;   
//   return isVisible;
// });

const visibleQuestions = feedrequirement.filter((q) => {
  if (!q.dependency) return true;
  const [parent, value] = q.dependency.split("-");
  const parentMatch = answers[parent] === value;
  
  if (q.subdependency) {
    const [sub, subval] = q.subdependency.split("-");
    return parentMatch && answers[sub] === subval;
  }
  return parentMatch;
});

const currentQuestions = visibleQuestions.slice(startIndex, startIndex + questionsPerPage);

return (
    
      <div className="card">        
        {currentQuestions.map((data, index) => { 
                       if(data.type ==="Radio")  {    
                        
                        return (                    
                            <Radiogroup key={index} label={data.label} values={data.values} sublabel = {data.sublabel}
                            SelectedAnswer={answers[data.name]} 
                            onAnsSelect={(selectedValue) => updateAnswer(data.name, selectedValue)} name={data.name}
                             />)                          
                       }
                       else if(data.type==="textbox"){
                        return (                            
                          <Textbox 
                          key={index} 
                          label={data.label} 
                          values={data.values || []} 
                          answers = {answers} 
                          onTextChange={(label, text) => updateAnswer(label, text)}
                        />
                          );
                        }
                        else if (data.type === "Dropdown") {
                          return (                                      
                              <Dropdown key = {index} label={data.label} values={data.values} dropdownlabel={data.dropdownlabel} selectedValue={answers[data.name]} 
                              onSelectChange={(selectedOption) => updateAnswer(data.name, selectedOption)}/>
                                                                     
                          );
                        }
                        else if (data.type === "Checkbox") {
                          return (
                            <Checkboxgroup
                              key={index}
                              label={data.label}
                              name={data.name}
                              values={data.values}
                              selectedValues={answers[data.name] || []}
                              onChange={(newSelectedValues) => updateAnswer(data.name, newSelectedValues)}
                            />
                          );
                        }
                          if (data.type === "DisplayCard") {
    const selectedValues = answers["displayCardSelection"] || []; 
    return (
      <DisplayCard
  selectedValues={answers["displayCardSelection"] || []}
  onSelectionChange={(newValues) => updateAnswer("displayCardSelection", newValues)}
  answers={answers}
  updateAnswer={updateAnswer}
/>
    );
  }
  if (data.type === "MultiLineInput") {
  return (
    <MultiLineInput
      key={index}
      label={data.label}
      description={data.description} 
      placeholder={data.placeholder}
      value={answers[data.name] || ""}
      onChange={(val) => updateAnswer(data.name, val)}
    />
  );
}
                        else if (data.type === "Combined") {
                          if (data.elements.length > 0) {
                            return (
                              <div key={index} className="combined-container">
                                {data.elements.filter((element) => {
          if (!element.dependency) return true;
          const [parent, expectedValue] = element.dependency.split("-");
          return answers[parent] === expectedValue;
        })
        .map((element, idx) => {
                                  // console.log("Element", element);
                                  if (element.type === "Radio") {
                                    return (                    
                                      <Radiogroup key={index} label={element.label} values={element.values} sublabel = {element.sublabel}
                                      SelectedAnswer={answers[element.name]} 
                                      onAnsSelect={(selectedValue) => updateAnswer(element.name, selectedValue)} name={element.name}
                                       />) 
                                  } 
                                  else if (element.type === "textbox") {
                                    return (
                                      <div key={idx} className="combined-item">                                      
                                  <Textbox key={idx} label={element.label} values={element.values || []} answers = {answers} 
                                  onTextChange={(label, text) => updateAnswer(label, text)}/>
                                      </div>
                                    );
                                  }
                                  else if (element.type === "Dropdown") {
                                    return (   <div key={idx} className="combined-item">                                   
                                        <Dropdown key = {idx} label={element.label} values={element.values} dropdownlabel={element.dropdownlabel} selectedValue={answers[element.name]} 
                              onSelectChange={(selectedOption) => updateAnswer(element.name, selectedOption)}/>
                                          </div>                                      
                                    );
                                  }   
                                  else if (element.type === "Checkbox"){
                                    
                            return (   <div key={idx} className="combined-item">                                   
                              <Checkboxgroup key={idx} label={element.label} name={element.name} values={element.values}
                                  selectedValues={answers[element.name] || []}
                                  onChange={(newSelectedValues) => updateAnswer(element.name, newSelectedValues)}
                            />
                                </div>                                      
                          );
                                  }
                                })}

                                </div>
                              
                            );
                            
                          }
                        }                    
                        
            
          
        })}
       
       
        {/* <Pagination
          initialPage={1} 
          total='4'
          onChange={handlePageChange}/> */}
          <div className="flex gap-2">
          <Button
  color="primary"
  variant="flat"
  isDisabled={page === 0} 
  onPress={() => handlePageChange("previous")}
>
  Previous
</Button>
<Button
  color="primary"
  variant="flat"
  isDisabled={page >= Math.ceil(visibleQuestions.length / questionsPerPage) - 1}
  onPress={() => handlePageChange("next")}
>
  Next
</Button>
      </div>
      </div>
      
    
  );
};

export default Card;