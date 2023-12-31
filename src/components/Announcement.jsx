import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  height: 35px;
  background-color: teal;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: 700;
  font-family: 'Roboto', sans-serif;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 999;
`;

const Announcement = () => {
  return (
    <Container>
      Super Deal! Free Shipping on Orders Over R500!
    </Container>
  );
};

export default Announcement;
