import React from "react";
import { StyledLink } from "./nav-links.styles";

const NavLinksComponent = ({ showExtensionLinks }) => (
  <>
    <StyledLink to={"/"} end={true}>
      Home
    </StyledLink>
    {showExtensionLinks && (
      <>
        <StyledLink to={"/settings"}>Settings</StyledLink>
        <StyledLink to={"/theme"}>Theme</StyledLink>
      </>
    )}
    <StyledLink to={"/about"}>About</StyledLink>
  </>
);

export default NavLinksComponent;
