import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";

const Wrapper = styled.div`
  padding-top: 200px;
  margin-right: auto;
  margin-left: auto;
  text-align: center;
`;

const Dashboard = () => {
  return (
    <Wrapper>
      <h1>Lista de Boletos</h1>

      <Link to="/emitir-boleto">
        <Button variant="contained" color="primary">
          Clique aqui para enviar um novo boleto
        </Button>
      </Link>
    </Wrapper>
  );
};

export default Dashboard;
