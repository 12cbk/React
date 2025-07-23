import React from "react";
import styled from "styled-components";
import imageSrc from "./Images/OIP.jpg";
import { useNavigate } from "react-router-dom";

const App = () => {

  const navigate = useNavigate();

  const handleevent = () => {
    navigate("/Managefeed");
  };

  return (
    <StyledWrapper>
       <div className="card row glass">
      <div className="screen">
        <div className="image_container">
      <img src={imageSrc} alt="Description" className="image" />
      </div>
      </div>
        <div className="full_page">
        <div className="content_wrapper">
        <div className="text">Welcome to DataBank!!</div>
        <button onClick={handleevent}> Log In </button>
        </div>
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .card {
    width: full;
    height: auto; /* Adjust height dynamically based on content */   
    border: 3px inset white;    
    transition: all 0.5s ease-in-out;
    border-radius: 1.5rem;
    display: flex;
    flex-direction: row; /* Stack content vertically */
    // justify-content: flex-start;
    justify-content: space-between; 
    align-items: flex-start;
    font-weight: bolder;
    //color: #8a8989;
    font-family: "Trebuchet MS", Arial, sans-serif;
    padding: 10px; /* Add padding for better spacing */
    overflow-y: auto; /* Scroll when content exceeds card height */
  }

  .text{
    float:right;
    display:flex;
   align-items: flex-start;
    gap:2rem;
    flex-wrap: wrap;
    width:full;
  
  }

  .content_wrapper {
    display: flex;
    flex-direction: column; /* Stack text and button */
    align-items: center; /* Center them */
  }

  .full_page{
    flex: 1; /* Make the welcome text container take 1 portion */
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 20px;
    
  }

  .text{
    padding-top: 6rem;
    font-size: 3rem;
  
  }

  .screen {
    //margin-left:0.5rem;
    //margin-right:2rem;
    margin-top:2rem;
    margin-bottom:2rem;
    //width:100%;
    //position: relative;
    // gap: 1rem;
    // display: flex;
    // flex-wrap: wrap;
    // aligh-items: flex-start;
    flex: 1; /* Make the image container take 1 portion */
    display: flex;
    justify-content: center;
    align-items: center;

  }

  .image {
    //position: absolute;
    //float:right;
    //margin: 0 0 1rem 1.5rem;
    // margin-left: 1rem;
    // margin-bottom:1rem;
    //top:0;
    // right:0;
    // padding-right: 2em;
    // padding-left: 5em;
    width: 55rem; /* Adjust the image width */
    height: 37rem; /* Maintain the aspect ratio */
    //align-self: flex-end; /* Ensure image stays at the top */
    border-radius: 1rem; /* Optional: Add rounded corners */
    object-fit: cover; /* Ensure the image fits neatly */
    flex-shrink: 0;
  }

  .card:hover {
    transform: translateY(-2px);
    transition: all 0.5s ease-in-out;
  }

  button {
   width: 9em;
   height: 3em;
   border-radius: 30em;
   font-size: 15px;
   font-family: inherit;
   border: none;
   position: relative;
   overflow: hidden;
   z-index: 1;
   box-shadow: 6px 6px 12px #c5c5c5,
               -6px -6px 12px #ffffff;
  }

  button::before {
   content: '';
   width: 0;
   height: 3em;
   border-radius: 30em;
   position: absolute;
   top: 0;
   left: 0;
   color: white;
   background-image: linear-gradient(to right,rgb(19, 33, 89) 0%,rgb(159, 194, 237) 100%);
   transition: .5s ease;
   display: block;
   z-index: -1;
  }

  button:hover::before {
    width: 9em;
  }
`;

export default App;