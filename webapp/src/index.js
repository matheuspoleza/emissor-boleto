import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Container from "@material-ui/core/Container";

import Header from "./components/Header";
import Signup from "./screens/Signup";
import Login from "./screens/Login";
import Dashboard from "./screens/Dashboard";
import CreateBillet from "./screens/CreateBillet";
import ResetPassword from "./screens/ResetPassword";

const App = () => {
  return (
    <Router>
      <div>
        <Header />

        <Container>
          <Route exact path="/" component={Login} />
          <Route exact path="/criar-conta" component={Signup} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/emitir-boleto" component={CreateBillet} />
          <Route path="/esqueci-minha-senha" component={ResetPassword} />
        </Container>
      </div>
    </Router>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));
