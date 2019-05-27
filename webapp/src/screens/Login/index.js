import React, { useState } from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import styled from "styled-components";
import axios from "axios";
import StyledLink from "components/StyledLink";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  padding-top: 200px;
  width: 400px;
  margin-right: auto;
  margin-left: auto;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const SubmitForm = styled.div`
  margin-top: 20px;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Login = ({ history }) => {
  const [user, setUser] = useState({
    username: "",
    password: ""
  });

  const handleChange = name => event => {
    setUser({ ...user, [name]: event.target.value });
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post("http://localhost:8000/login/", user);
      debugger;
      localStorage.setItem("accessToken", response.data.token);
      history.push(`/dashboard`);
    } catch (error) {
      console.log(error);
    }
  };

  if (localStorage.getItem("accessToken")) {
    history.push(`/dashboard`);
  }

  return (
    <Wrapper>
      <h1>Login</h1>

      <Form>
        <TextField
          label="username"
          type="username"
          value={user.username}
          onChange={handleChange("username")}
        />
        <TextField
          label="senha"
          type="password"
          value={user.password}
          onChange={handleChange("password")}
        />

        <SubmitForm>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Entrar
          </Button>

          <StyledLink>
            <Link to="/criar-conta">Criar uma conta</Link>
          </StyledLink>
          <StyledLink>
            <Link to="/esqueci-minha-senha">Esqueci minha senha</Link>
          </StyledLink>
        </SubmitForm>
      </Form>
    </Wrapper>
  );
};

export default withRouter(Login);
