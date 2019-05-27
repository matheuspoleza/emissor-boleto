import React from "react";
import styled from "styled-components";
import { withRouter } from "react-router";

const StyledHeader = styled.div`
  width: 100%;
  height: 50px;
  background: #3f51b5;
  position: absolute;
  top: 0;
  left: 0;
  color: white;
  padding-top: 25px;
  display: flex;
  justify-content: space-around;
  font-size: 20px;
`;

const LogoutLink = styled.div`
  cursor: pointer;
  text-decoration: underline;
`;

const Logo = styled.div`
  font-weight: 600;
  cursor: pointer;
`;

const Header = ({ history }) => {
  const isLoggedIn = localStorage.getItem("accessToken");

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    history.push("/");
  };

  const handleLogoClick = () => history.push("/");

  return (
    <StyledHeader>
      <Logo onClick={handleLogoClick}>Emissor de Boletos</Logo>
      {isLoggedIn && <LogoutLink onClick={handleLogout}>Sair</LogoutLink>}
    </StyledHeader>
  );
};

export default withRouter(Header);
