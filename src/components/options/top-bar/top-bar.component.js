import React from "react";
import { Navigation, StyledLink, TopBar } from "./top-bar.styles";
import { Container } from "../shared.styles";

const TopBarComponent = (props) => {
  return (
    <TopBar>
      <Container>
        <Navigation>
          <StyledLink to="/" end={true}>
            Home
          </StyledLink>
          <StyledLink to="/settings">Settings</StyledLink>
          <StyledLink to="/theme">Theme</StyledLink>
          <StyledLink to="/about">About</StyledLink>
        </Navigation>
      </Container>
    </TopBar>
  );
};

export default TopBarComponent;
