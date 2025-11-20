import React from 'react';
import styled from 'styled-components';
import Card from './card';

const Header = () => {
  return (
    <StyledWrapper>
      <div className="card">
        
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .card {
   width: 100;
   height: 254px;
   border-radius: 30px;
   background:rgb(247, 243, 243);
   box-shadow: 15px 15px 30px rgb(25, 25, 25),
               -15px -15px 30px rgb(60, 60, 60);
  }`;

export default Header;
