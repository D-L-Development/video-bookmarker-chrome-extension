import React from "react";
import { Navigation, StyledLink } from "./top-bar.styles";

const TopBarComponent = (props) => {
  return (
    <Navigation>
      <StyledLink to="/options.html">Home</StyledLink>
      <StyledLink to="/options.html/settings">Settings</StyledLink>
      <StyledLink to="/options.html/theme">Theme</StyledLink>
      <StyledLink to="/options.html/about">About</StyledLink>
    </Navigation>
  );
};

export default TopBarComponent;
