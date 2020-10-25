import React, { useState } from "react";
import styled from "@emotion/styled";
import PropTypes from 'prop-types';
import { obtenerDiferenciaYear, calcularMarca, obtenerPlan } from "../helper";

const Campo = styled.div`
  display: flex;
  margin-bottom: 1rem;
  align-items: center;
`;
const Label = styled.label`
  flex: 0 0 100px;
`;

const Select = styled.select`
  display: block;
  width: 100%;
  padding: 1rem;
  border: 1px solid #e1e1e1;
  -moz-appearance: none;
`;

const InpuntRadio = styled.input`
  margin: 0 1rem;
`;

const Boton = styled.button`
  background: #00838f;
  font-size: 16px;
  width: 100%;
  padding: 1rem;
  color: #fff;
  text-transform: uppercase;
  font-weight: bold;
  border: none;
  margin-top: 2rem;

  &:hover {
    background: #26c6da;
    cursor: pointer;
  }
`;

const Error = styled.div`
  background: red;
  color: white;
  padding: 1rem;
  width: 100%;
  text-align: center;
  margin-bottom: 2rem;
`;

const Formulario = ({setResumen, setCargando}) => {
  // State para los valores del form
  const [datos, setDatos] = useState({
    marca: "",
    year: "",
    plan: "",
  });

  const [error, setError] = useState(false);

  // Estraigo los datos del state
  const { marca, year, plan } = datos;

  // Leo los datos del form y los guardo en el state
  const obtenerDatos = (e) => {
    setDatos({
      ...datos,
      [e.target.name]: e.target.value,
    });
  };

  // Al enviar el form
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validar
    if (marca.trim() === "" || year.trim() === "" || plan.trim() === "") {
      setError(true);
      return;
    }

    setError(false);

    // Base
    let resultado = 2000;

    // Obtener la diferencia de años
    const diferencia = obtenerDiferenciaYear(year);

    // Por cada año hay que restar el 3%
    resultado -= (diferencia * 3 * resultado) / 100;

    // Americano 15%
    // Asiático 5%
    // Europeo 30%

    resultado *= calcularMarca(marca);

    // Básico aumenta 20%
    // Completo 50%
    let incrementoPlan = obtenerPlan(plan);
    resultado = parseFloat(incrementoPlan * resultado).toFixed(2);

    // Pasar datos al componente principal
    setCargando(true);

    setTimeout(() => {
      setCargando(false);
      setResumen({
        cotizacion: Number(resultado),
        datos
      });
    }, 3000);
  };

  return (
    <form onSubmit={handleSubmit}>
      {error ? <Error>Ningun campo puede quedar vacio</Error> : null}
      <Campo>
        <Label htmlFor="marca">Marca:</Label>
        <Select id="marca" name="marca" value={marca} onChange={obtenerDatos}>
          <option value="">--Seleccione--</option>
          <option value="americano">Americano</option>
          <option value="europeo">Europeo</option>
          <option value="asiatico">Asiatico</option>
        </Select>
      </Campo>

      <Campo>
        <Label htmlFor="anio">Año</Label>
        <Select id="anio" name="year" value={year} onChange={obtenerDatos}>
          <option value="">-- Seleccione --</option>
          <option value="2021">2021</option>
          <option value="2020">2020</option>
          <option value="2019">2019</option>
          <option value="2018">2018</option>
          <option value="2017">2017</option>
          <option value="2016">2016</option>
          <option value="2015">2015</option>
          <option value="2014">2014</option>
          <option value="2013">2013</option>
          <option value="2012">2012</option>
        </Select>
      </Campo>

      <Campo>
        <Label htmlFor="plan">Plan</Label>
        <InpuntRadio
          type="radio"
          name="plan"
          value="basico"
          checked={plan === "basico"}
          onChange={obtenerDatos}
        />{" "}
        Basico
        <InpuntRadio
          type="radio"
          name="plan"
          value="completo"
          checked={plan === "completo"}
          onChange={obtenerDatos}
        />{" "}
        Completo
      </Campo>

      <Boton type="submit">Cotizar</Boton>
    </form>
  );
};

Formulario.propTypes = {
  setResumen: PropTypes.func.isRequired,
  setCargando: PropTypes.func.isRequired
}

export default Formulario;
