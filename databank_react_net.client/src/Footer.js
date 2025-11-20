import React from "react";
import styled from "styled-components";

const Footer = () => {
    return (
      <StyledWrapper>
        
         
            <div className="content">
              {/* Image Section */}
              {/* <img
                src="https://india.oup.com/wp-content/themes/indiaoup/OUP_logo.png" // Replace with your image path or URL
                alt="Your Image"
                className="image"
              /> */}
              {/* Text Section */}
              <div className="text">
                <div className="shine">Copyright © Oxford University Press, 2012. All Rights Reserved.</div>
                <div>Contact Us | Help & Support | Privacy Policy, Cookie Policy and Legal Notice</div>
              </div>
            </div>
          
        
      </StyledWrapper>
    );
  };

  const StyledWrapper = styled.div`
    
    .content {
      //display: flex;
      padding-top: 2rem;
      align-items: center; 
      font-size: 0.8rem;
    }
  
    
    .text {
    // display: flex;
    // flex-direction: column; /* Stacks the text vertically */
      gap: 3.50px; /* Space between title and subtitle */
      paddding: 2rem;
      align-items: center;
      text-align: center;
      font-weight: 100;
    }
  
    .shine {
      font-size: 0.8rem; /* Roughly 7.4 mm */
      text-align: center;
      font-weight: 500;
      color: rgba(7, 7, 121, 0.3);
      background: #222 -webkit-gradient(
          linear,
          left top,
          right top,
          from(#222),
          to(#222),
          color-stop(0.6, #fff)
        )
        0 0 no-repeat;
      background-image: -webkit-linear-gradient(
        -40deg,
        transparent 0%,
        transparent 40%,
        #fff 50%,
        transparent 60%,
        transparent 100%
      );
      -webkit-background-clip: text;
      -webkit-background-size: 50px;
      -webkit-animation: zezzz 5s infinite;
    }
  
    @-webkit-keyframes zezzz {
      0%,
      10% {
        background-position: -200px;
      }
      20% {
        background-position: top left;
      }
      100% {
        background-position: 200px;
      }
    }
  `;

  export default Footer;