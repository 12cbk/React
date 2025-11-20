// import React from "react";
// import styled from "styled-components";
// import imageSrc from "./Images/OIP.jpg";
// import { useNavigate } from "react-router-dom";

// const App = () => {

//   const navigate = useNavigate();

//   const handleevent = () => {
//     navigate("/Managefeed");
//   };

//   return (
//     <StyledWrapper>
//        <div className="cardapp">
//       <div className="screen">
//         <div className="image_container">
//       <img src={imageSrc} alt="Description" className="image" />
//       </div>
//       </div>
//         <div className="full_page">
//         <div className="content_wrapper">
//         <div className="text">Welcome to DataBank!!</div>
//        <div className="button_container">
//         <button className="initialbutton"> Log In </button>
//         <button className="initialbutton"> Register </button>
//         </div>
//         <div className="button_container">
//         <button  onClick={handleevent} className="initialbutton"> Create Feeds </button>
//         </div>
//         </div>
//       </div>
//     </StyledWrapper>
//   );
// };

// const StyledWrapper = styled.div`
//   .card {
//     width: full;
//     height: auto; /* Adjust height dynamically based on content */   
//     border: 3px inset white;    
//     transition: all 0.5s ease-in-out;
//     border-radius: 1.5rem;
//     display: flex;
//     flex-direction: row; /* Stack content vertically */
//     // justify-content: flex-start;
//     justify-content: space-between; 
//     align-items: flex-start;
//     font-weight: bolder;
//     //color: #8a8989;
//     font-family: "Trebuchet MS", Arial, sans-serif;
//     padding: 10px; /* Add padding for better spacing */
//     overflow-y: auto; /* Scroll when content exceeds card height */
//   }

//   .text{
//     float:right;
//     display:flex;
//    align-items: flex-start;
//     gap:2rem;
//     flex-wrap: wrap;
//     width:full;
  
//   }

//   .content_wrapper {
//     display: flex;
//     flex-direction: column; /* Stack text and button */
//     align-items: center; /* Center them */
//   }

//   .full_page{
//     flex: 1; /* Make the welcome text container take 1 portion */
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     text-align: center;
//     padding: 20px;
    
//   }

//   .text{
//     padding-top: 6rem;
//     font-size: 3rem;
  
//   }

//   .screen {
//     //margin-left:0.5rem;
//     //margin-right:2rem;
//     margin-top:2rem;
//     margin-bottom:2rem;
//     //width:100%;
//     //position: relative;
//     // gap: 1rem;
//     // display: flex;
//     // flex-wrap: wrap;
//     // aligh-items: flex-start;
//     flex: 1; /* Make the image container take 1 portion */
//     display: flex;
//     justify-content: center;
//     align-items: center;

//   }

//   .image {
//     //position: absolute;
//     //float:right;
//     //margin: 0 0 1rem 1.5rem;
//     // margin-left: 1rem;
//     // margin-bottom:1rem;
//     //top:0;
//     // right:0;
//     // padding-right: 2em;
//     // padding-left: 5em;
//     width: 55rem; /* Adjust the image width */
//     height: 37rem; /* Maintain the aspect ratio */
//     //align-self: flex-end; /* Ensure image stays at the top */
//     border-radius: 1rem; /* Optional: Add rounded corners */
//     object-fit: cover; /* Ensure the image fits neatly */
//     flex-shrink: 0;
//   }

//   .card:hover {
//     transform: translateY(-2px);
//     transition: all 0.5s ease-in-out;
//   }

//   button {
//    width: 9em;
//    height: 3em;
//    border-radius: 30em;
//    font-size: 15px;
//    font-family: inherit;
//    border: none;
//    position: relative;
//    overflow: hidden;
//    z-index: 1;
//    box-shadow: 6px 6px 12px #c5c5c5,
//                -6px -6px 12px #ffffff;
//   }

//   button::before {
//    content: '';
//    width: 0;
//    height: 3em;
//    border-radius: 30em;
//    position: absolute;
//    top: 0;
//    left: 0;
//    color: white;
//    background-image: linear-gradient(to right,rgb(19, 33, 89) 0%,rgb(159, 194, 237) 100%);
//    transition: .5s ease;
//    display: block;
//    z-index: -1;
//   }

//   button:hover::before {
//     width: 9em;
//   }
// `;

// export default App;

import React, { useEffect } from "react";
import styled from "styled-components";
import imageSrc from "./Images/OIP.jpg";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const App = () => {

  const navigate = useNavigate();
    
  //const handleevent = () => {
  //  navigate("/Managefeed");
  //};

  //const handleLogin = () => {
  //  navigate("/userfeed");
    //};
    const handleevent = async () => {
        navigate("/Managefeed");
    };

    const handleRegister = async () => {
        window.location.href = 'https://dev.account.oup.com/register?providerId=DATABANK';
    }

    const handleLogin = () => {
        window.location.href = `/account/login?returnUrl=/userfeed`;
    };

    
  return (
    <StyledWrapper>
      <div className="cardapp">
      <div className="screen">
        <div className="image_container">
      <img src={imageSrc} alt="Description" className="image" />
      </div>
      </div>
        <div className="full_page">
        <div className="content_wrapper">
        <div className="text">Welcome to DataBank!!</div>
        <div className="button_container">
        <button onClick={handleLogin} className="initialbutton"> Log In </button>
        <button onClick={handleRegister} className="initialbutton"> Register </button>
        </div>
        <div className="button_container">
        <button  onClick={handleevent} className="initialbutton"> Create Feeds </button>
        </div>
        </div>
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .cardapp {
    width: full;
    height: auto; /* Adjust height dynamically based on content */
    // background: #e8e8e8;
    //background: linear-gradient(rgb(212, 212, 219),rgb(237, 238, 246));
    //border: 3px inset white;
    //box-shadow: inset 20px 20px 60px #c5c5c5, inset -20px -20px 60px #ffffff;
    transition: all 0.5s ease-in-out;
    //border-radius: 1.5rem;
    display: flex;
    flex-direction: row; /* Stack content vertically */
    // justify-content: flex-start;
    justify-content: space-between; 
    align-items: flex-start;
    font-weight: bolder;
    //color: #8a8989;
    font-family: "Trebuchet MS", Arial, sans-serif;
    //padding: 10px; /* Add padding for better spacing */
    overflow-y: auto; /* Scroll when content exceeds card height */
      margin-right: 4rem;
    margin-left: 4rem;
    margin-top:2rem;
    margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-radius: 1.2rem;
  box-shadow: 0px 1rem 1.5rem -0.9rem #000000e1;
  padding-left: 4rem;
  padding-right: 4rem;
  padding-top:1rem;
  background-color: rgba(245, 245, 245, 1);
  }

  .text{
    float:right;
    display:flex;
    align-items: flex-start;
    gap:2rem;
    flex-wrap: wrap;
    width:full;
  
  }

  .button_container{
    padding-top: 4rem;
    display: flex;
    flex-direction: row; /* Stack content vertically */
    gap: 3rem;
  
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
    padding-top: 10rem;
    font-size: 3.5rem;
  
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

  .initialbutton {
  flex: 1; /* Make the welcome text container take 1 portion */
  //padding: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  //text-align: center;
   width: 12em;
   height: 3em;
   border-radius: 30em;
   font-size: 15px;
   font-family: inherit;
   border: 2px solid rgb(19, 33, 89);
   position: relative;
   overflow: hidden;
   z-index: 1;
   box-shadow: 6px 6px 12px #c5c5c5,
               -6px -6px 12px #ffffff;
  }

  .initialbutton::before {
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

  .initialbutton:hover::before {
    width: 12em;
  }
`;

export default App;