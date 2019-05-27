import React from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";

const Dashboard = () => {
  return (
    <div>
      <h1>Lista de Boletos</h1>

      <Link to="/emitir-boleto">
        <Button variant="contained" color="primary">
          Clique aqui para enviar um novo boleto
        </Button>
      </Link>
    </div>
  );
};

export default Dashboard;
