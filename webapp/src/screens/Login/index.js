import React from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Login = () => {
  return (
    <Wrapper>
      <h1>Entre sua conta </h1>

      <Form>
        <TextField label="email" type="email" />
        <TextField label="senha" type="password" />

        <Link to="/dashboard">
          <Button variant="contained" color="primary">
            Entrar
          </Button>
        </Link>
      </Form>
    </Wrapper>
  );
};

export default Login;
