import React from "react";
import {
  ExtensionName,
  Navigation,
  StyledLink,
  TopBar,
} from "./top-bar.styles";
import { OuterContainer, RowContainer } from "../shared.styles";

const TopBarComponent = (props) => {
  return (
    <TopBar>
      <OuterContainer
        isRow={true}
        style={{ alignItems: "center", justifyContent: "space-between" }}
      >
        <RowContainer isRow={true} style={{ gap: "1rem" }}>
          <img
            src={"/images/extension.icon-48x48.png"}
            alt={"Extension icon"}
            style={{ height: "2rem" }}
          />
          <ExtensionName>Web Video Bookmarker</ExtensionName>
        </RowContainer>
        <Navigation>
          <StyledLink to="/" end={true}>
            Home
          </StyledLink>
          <StyledLink to="/settings">Settings</StyledLink>
          <StyledLink to="/theme">Theme</StyledLink>
          <StyledLink to="/about">About</StyledLink>
        </Navigation>
      </OuterContainer>
    </TopBar>
  );
};

export default TopBarComponent;
