import React from "react";
import { Navigation, StyledLink } from "./top-bar.styles";

const TopBarComponent = (props) => {
  return (
    <Navigation>
      <StyledLink to="/" end={true}>
        Home
      </StyledLink>
      <StyledLink to="/settings">Settings</StyledLink>
      <StyledLink to="/theme">Theme</StyledLink>
      <StyledLink to="/about">About</StyledLink>
    </Navigation>
  );
};

export default TopBarComponent;
