import React from 'react';
import styled from '@emotion/styled';
import {capitalize} from '../helper';
import PropTypes from 'prop-types';

const ContenedorResumen = styled.div`
  padding: 1rem;
  text-align: center;
  background: #00838F;
  color: #fff;
  margin-top: 1rem;
`;

const Resumen = ({datos}) => {
  const {marca, year, plan} = datos;

  if(datos === '' || year === '' || plan === '') return null; 

  return (
    <ContenedorResumen>
      <h2>Resumen de Cotización</h2>
      <ul>
        <li>Marca:  {capitalize(marca)}</li>
        <li>Plan: {capitalize(plan)}</li>
        <li>Año: {year}</li>
      </ul>
    </ContenedorResumen>
  );
}

Resumen.propTypes = {
  datos: PropTypes.object.isRequired
}

export default Resumen;