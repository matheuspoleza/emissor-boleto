import React, { useState } from "react";
import { withRouter } from "react-router";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import styled from "styled-components";
import axios from "axios";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  padding-top: 200px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const CreateBillet = ({ history }) => {
  const [billet, setBillet] = useState({
    payerName: "",
    daysDue: "",
    value: ""
  });

  const handleChange = name => event => {
    setBillet({ ...billet, [name]: event.target.value });
  };

  const handleSubmit = async () => {
    const URL = "http://localhost:8000/billets";

    try {
      const response = await axios({
        url: `${URL}?diasVencimento=${billet.daysDue}&pagador=${
          billet.payerName
        }&valorBoleto=${billet.value}`,
        method: "GET",
        responseType: "blob" // important
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "boleto.pdf");
      document.body.appendChild(link);
      link.click();
      setBillet({
        payerName: "",
        daysDue: "",
        value: ""
      });
    } catch (error) {
      alert("Não foi possível gerar o boleto!");
    }
  };

  return (
    <Wrapper>
      <h1>Emitir boleto</h1>

      <Form>
        <TextField
          label="Nome do Pagador"
          type="payerName"
          value={billet.payerName}
          onChange={handleChange("payerName")}
        />
        <TextField
          label="Dias para o vencimento"
          type="daysDue"
          value={billet.daysDue}
          onChange={handleChange("daysDue")}
        />
        <TextField
          label="Valor"
          type="value"
          value={billet.value}
          onChange={handleChange("value")}
        />

        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Emitir
        </Button>
      </Form>
    </Wrapper>
  );
};

export default withRouter(CreateBillet);
