import React, { useState, useEffect } from "react";
import formatFeedRequirements from  './Formatfeed'
import { Pagination, Button } from "@heroui/react";
import Radiogroup from "./Radiogroup";
 import feedrequirements from "./Feedrequirements";
import Dropdown from "./dropdown";
import "./Managefeed.css";
import Textbox from "./textbox";
import { fetchData } from "./ApiService";
const Card = () => {
  const [page, setPage] = useState(0); 
  const [answers, setAnswers] = useState({});
  const [feedrequirement, setFeedRequirements] = useState(feedrequirements);
  const questionsPerPage = 3;   
  const startIndex = page * questionsPerPage;
  
  useEffect(() => {
    fetchData().then((extractedData) => {
      let formattedData = formatFeedRequirements(extractedData);
      console.log("Format Data:", formattedData);
      setFeedRequirements((prev) => [...prev, ...formattedData]);
      console.log("feed Data:", feedrequirement);
    });
  }, []);

  
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
    
const visibleQuestions = feedrequirement.filter((question) => {
  if (!question.dependency) {return true; }
  const [parentName, expectedValue] = question.dependency.split("-");
  const isVisible =  answers[parentName] === expectedValue;   
  return isVisible;
});

console.log("answer:,",answers);

const currentQuestions = visibleQuestions.slice(startIndex, startIndex + questionsPerPage);

  
  
  return (
    
      <div className="card">        
        {currentQuestions.map((data, index) => { 
                       if(data.type ==="Radio")  {    
                        
                        return (                    
                            <Radiogroup key={index} label={data.label} values={data.values} 
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
                          onTextChange={(label, text) => updateAnswer(label, text)}
                        />
                          );
                        }
                        else if (data.type === "Dropdown") {
                          return (                                      
                              <Dropdown key = {index} label={data.label} values={data.values} selectedValue={answers[data.name]} 
                              onSelectChange={(selectedOption) => updateAnswer(data.name, selectedOption)}/>
                                                                     
                          );
                        }

                        else if (data.type === "combined") {
                          if (data.elements.length > 0) {
                            return (
                              <div key={index} className="combined-container">
                                {data.elements.map((element, idx) => {
                                  // console.log("Element", element);
                                  if (element.type === "Radio") {
                                    return (     
                                      <div key={idx} className="combined-item">                               
                                    <Radiogroup key={idx} label={element.label} values={element.values} trigger={data.trigger} 
                                    SelectedAnswer={answers[data.label]} 
                            onAnsSelect={(selectedValue) => updateAnswer(element.label, selectedValue)}/>
                            </div>)
                                  } 
                                  else if (element.type === "textbox") {
                                    return (
                                      <div key={idx} className="combined-item">
                                      <Textbox key={idx} label={element.label} value={answers[element.label] || ""} 
                                      onTextChange={(text) => updateAnswer(element.label, text)} />
                                      </div>
                                    );
                                  }
                                  else if (element.type === "dropdown") {
                                    return (   <div key={idx} className="combined-item">                                   
                                        <Dropdown label={element.label} values={element.values} selectedValue={answers[element.label]} 
                                        onSelectChange={(selectedOption) => updateAnswer(element.label, selectedOption)}/>
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
