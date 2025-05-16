
import React from 'react';
import styled from 'styled-components';

const Checkboxgroup = ({ label, name, values = [], selectedValues = [], onChange }) => {
  return (
    <StyledWrapper>
      <div className="checkbox-group">
        <h4>{label}</h4>
        {values.map((item, idx) => (
          <label key={idx} className="container">
            <input
              type="checkbox"
              name={name}
              value={item.value}
              checked={selectedValues.includes(item.value)}
              onChange={onChange}
            />
            <div className="checkmark" />
            <span className="checkbox-label-text">{item.text}</span>
          </label>
        ))}
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .checkbox-group {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .container {
    position: relative;
    display: flex;
    align-items: center;
    gap: 12px;
    width: fit-content;
    height: 58px;
    cursor: pointer;
  }

  .container input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  .checkmark {
    position: relative;
    height: 58px;
    width: 58px;
    background: #e0e5ec;
    border-radius: 12px;
    transition: all 0.4s cubic-bezier(0.42, 0, 0.58, 1);
    box-shadow:
      4px 4px 8px rgba(163, 177, 198, 0.6),
      -4px -4px 8px rgba(255, 255, 255, 0.9);
  }

  .checkmark:before,
  .checkmark:after {
    content: "";
    position: absolute;
    background: #3fa6c5;
    height: 5px;
    border-radius: 2px;
    transform-origin: 0 0;
    opacity: 0;
  }

  .checkmark:before {
    left: 13px;
    top: 25px;
    width: 20px;
    transform: rotate(45deg) scale(0);
  }

  .checkmark:after {
    left: 21px;
    top: 40px;
    width: 34px;
    transform: rotate(-45deg) scale(0);
  }

  .container input:checked + .checkmark {
    background: linear-gradient(145deg, #caced6, #f0f5ff);
    box-shadow:
      inset 2px 2px 4px rgba(163, 177, 198, 0.6),
      inset -2px -2px 4px rgba(255, 255, 255, 0.9);
  }

  .container input:checked + .checkmark:before {
    opacity: 1;
    transform: rotate(45deg) scale(1);
    transition-delay: 0s;
  }

  .container input:checked + .checkmark:after {
    opacity: 1;
    transform: rotate(-45deg) scale(1);
    transition-delay: 0.15s;
  }

  .checkbox-label-text {
    font-size: 16px;
    color: #333;
  }
`;

export default Checkboxgroup;
