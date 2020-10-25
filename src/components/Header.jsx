import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

const ContenenedorHeader = styled.header`
  background: #26C6DA;
  padding: 10px;
  font-weight: bold;
  color: #ffffff;
`;

const TextoHeader = styled.h1`
  font-size: 2rem;
  margin: 0;
  font-family: 'Slabo 27px', serif;
  text-align: center;
`;

const Header = ({titulo}) => (
  <ContenenedorHeader>
    <TextoHeader>{titulo}</TextoHeader>
  </ContenenedorHeader>
);

Header.propTypes = {
  titulo: PropTypes.string.isRequired
}

export default Header;