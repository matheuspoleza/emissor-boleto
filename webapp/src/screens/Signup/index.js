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
  width: 400px;
  padding-top: 200px;
  margin-left: auto;
  margin-right: auto;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Signup = ({ history }) => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: ""
  });

  const handleChange = name => event => {
    setUser({ ...user, [name]: event.target.value });
  };

  const handleSubmit = async () => {
    console.log(user);

    try {
      const response = await axios.post("http://localhost:8000/users/", user);
      history.push("/");
    } catch (error) {
      Object.keys(error.response.data).map(param => {
        alert(`${param}: ${error.response.data[param]}`);
      });
    }
  };

  return (
    <Wrapper>
      <h1>Crie uma conta </h1>

      <Form>
        <TextField
          label="username"
          type="username"
          value={user.username}
          onChange={handleChange("username")}
        />
        <TextField
          label="email"
          type="email"
          value={user.email}
          onChange={handleChange("email")}
        />
        <TextField
          label="senha"
          type="password"
          value={user.password}
          onChange={handleChange("password")}
        />

        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Criar conta
        </Button>

        <StyledLink>
          <Link to="/">Voltar</Link>
        </StyledLink>
      </Form>
    </Wrapper>
  );
};

export default withRouter(Signup);
