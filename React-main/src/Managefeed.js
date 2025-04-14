import React, { useState } from "react";
import styled from "styled-components";
import { Pagination, Switch } from "@heroui/react";
import Radiogroup from "./Radiogroup";
import feedrequirements from "./Feedrequirements";
import Dropdown from "./dropdown";
import "./Managefeed.css";
import Textbox from "./textbox";
const Card = () => {
  const [page, setPage] = useState(0);
  const questionsPerPage = 3; 

  
  const startIndex = page * questionsPerPage;
  console.log(startIndex);
  //   const lastquestion = startIndex - questionsPerPage
//   const currentQuestions = feedrequirements.slice(startIndex,lastquestion);
  const currentQuestions = feedrequirements.slice(startIndex,startIndex + questionsPerPage );

  const handlePageChange = (newPage) => {
    setPage(newPage - 1); 
  };
 

  return (
    
      <div className="card">        
        {currentQuestions.map((data, index) => { 
                       if(data.type ==="Radio")  {    
                        console.log("Data", data);
                        return (                    
                            <Radiogroup key={index} label={data.label} values={data.values} trigger={data.trigger}/>)                          
                       }
                       else if(data.type==="textbox"){
                        return (                            
                            <Textbox key={index} label={data.label} value={data.placeholder} />
                          );
                        }

                        else if (data.type === "combined") {
                          if (data.elements.length > 0) {
                            return (
                              <div>
                                {data.elements.map((element, idx) => {
                                  console.log("Element", element);
                                  if (element.type === "Radio") {
                                    return (                                    
                                    <Radiogroup key={idx} label={element.label} values={element.values} trigger={data.trigger} />)
                                  } else if (element.type === "textbox") {
                                    return (
                                      console.log("Textbox", element),
                                      <Textbox key={idx} label={element.label} value={element.placeholder} />
                                      
                                    );
                                  }
                                  else if (element.type === "dropdown") {
                                    return (                                      
                                        <Dropdown label={element.label} values={element.values} />                                      
                                    );
                                  }   

                                })}
                              </div>
                            );
                          }
                        }                    
                        
            
          
        })}
       
       
        <Pagination
          initialPage={1} 
          total={Math.ceil(feedrequirements.length / questionsPerPage)}
          onChange={handlePageChange}/>
      </div>
    
  );
};



export default Card;
