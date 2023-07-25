import React from "react";
import { StyledLink } from "./nav-links.styles";

const NavLinksComponent = ({ showExtensionLinks, isFooter = false }) => (
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
    <StyledLink
      to={
        "https://github.com/D-L-Development/video-bookmarker-chrome-extension"
      }
      target={"_blank"}
    >
      GitHub
    </StyledLink>
    {isFooter && (
      <>
        <StyledLink to={"https://www.freepik.com"} target={"_blank"}>
          Freepik Icons
        </StyledLink>
        <StyledLink to={"https://storyset.com/design"} target={"_blank"}>
          Design illustrations by Storyset
        </StyledLink>
      </>
    )}
  </>
);

export default NavLinksComponent;
