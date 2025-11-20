import React from "react";
import styled from "styled-components";

const Card = () => {
  return (
    <StyledWrapper>
      <div className="bgblue">
        <div className="card">
          <div className="content">
            {/* Image Section */}
            <img
              src="https://india.oup.com/wp-content/themes/indiaoup/OUP_logo.png" // Replace with your image path or URL
              alt="Your Image"
              className="image"
            />
            {/* Text Section */}
            <div className="text">
              <div className="shine">DataBank</div>
              <span className="subtitle">
                OUP product information, free to download
              </span>
            </div>
          </div>
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .bgblue {
    background: linear-gradient(135deg,rgba(150, 162, 180, 0.96),rgb(95, 108, 152),rgba(14, 14, 67, 0.6));
    padding: 0.1rem;
    border-radius: 1.2rem;
    box-shadow: 0px 1rem 1.5rem -0.9rem #000000e1;
    max-width: 100%;
    // max-height: 80px;
  }

  .card {
    font-size: 1rem;
    color:rgb(12, 28, 59);
    background: linear-gradient(135deg, rgb(190, 196, 216) 0%, rgb(77, 93, 150) 43%, rgb(25, 45, 113) 100%);
    padding: 0.2rem;
    border-radius: 1.2rem;
    display: flex;
    align-items: center; /* Centers items vertically */
  }

  .content {
    display: flex;
    align-items: center; 
  }

  .image {
    height: 50px;
    margin-right: 1rem; /* Space between image and text */
  }

  .text {
    display: flex;
    flex-direction: column; /* Stacks the text vertically */
    gap: 3.50px; /* Space between title and subtitle */
    
  }

  .shine {
    font-size: 24.9px; /* Roughly 7.4 mm */
    font-weight: 600;
    color: rgba(9, 9, 195, 0.3);
    background: #222 -webkit-gradient(
        linear,
        left top,
        right top,
        from(#222),
        to(#222),
        color-stop(0.5, #fff)
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

  .subtitle {
    font-size: 15.9px; /* Roughly 7.4 mm */
    color: white;
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

export default Card;