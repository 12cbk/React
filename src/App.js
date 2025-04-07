import React from "react";
import styled from "styled-components";

const App = () => {
  const contents = [
    {
      question: "Welcome to Oxford DataBank",
      answer:
        "Register to use Oxford DataBank - it's free and offers access to detailed product information, jacket images and sample content for titles published by OUP and its affiliates.",
    },
    {
      question: "What is Oxford DataBank?",
      answer:
        "Oxford DataBank is a free resource for downloading product information for titles published and distributed by Oxford University Press, UK.",
    },
    {
      question: "Who can use it?",
      answer:
        "Anyone with access to the internet - whether bookseller, librarian or distributor. The service is free.",
    },
    {
      question: "What information is available?",
      answer:
        "Oxford DataBank runs queries from OUP's complete UK catalogue of 'in print' and forthcoming products available internationally from the UK distribution centre.",
    },
    {
      question: "Please note:",
      answer:
        "All reports include data only from OUP's UK distribution centre. For information on titles available from OUP's international network of distribution centres, please contact your local OUP branch or representative: http://www.oup.com/about/worldwide/",
    },
  ];

  return (
    <StyledWrapper>
      <div className="card">
        {contents.map((item, index) => (
          <div key={index} className="content">
            <div className="question">{item.question}</div>
            <div className="answer">{item.answer}</div>
          </div>
        ))}
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .card {
    width: full;
    height: auto; /* Adjust height dynamically based on content */
    background: #e8e8e8;
    border: 3px inset white;
    box-shadow: inset 20px 20px 60px #c5c5c5, inset -20px -20px 60px #ffffff;
    transition: all 0.5s ease-in-out;
    border-radius: 1.5rem;
    display: flex;
    flex-direction: column; /* Stack content vertically */
    justify-content: flex-start;
    align-items: center;
    font-weight: bolder;
    color: #8a8989;
    font-family: "Trebuchet MS", Arial, sans-serif;
    padding: 10px; /* Add padding for better spacing */
    overflow-y: auto; /* Scroll when content exceeds card height */
  }

  .content {
    margin-bottom: 10px;
    text-align: center;
  }

  .question {
    font-weight: bold;
    color:rgb(34, 28, 69); /* Highlight question text */
    margin-bottom: 5px;
  }

  .answer {
    font-size: 0.9em;
    color: #8a8989; /* Subtle color for answers */
  }

  .card:hover {
    transform: translateY(-5px);
    transition: all 0.5s ease-in-out;
  }
`;

export default App;