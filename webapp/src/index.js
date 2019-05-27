import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Container from "@material-ui/core/Container";

import Header from "./components/Header";
import Login from "./screens/Login";
import Dashboard from "./screens/Dashboard";
import CreateBillet from "./screens/CreateBillet";

const App = () => {
  return (
    <Router>
      <div>
        <Header />

        <Container>
          <Route exact path="/" component={Login} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/emitir-boleto" component={CreateBillet} />
        </Container>
      </div>
    </Router>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));
