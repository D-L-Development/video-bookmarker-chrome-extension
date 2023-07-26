import React from "react";
import { ExtensionName, Navigation, TopBar } from "./top-bar.styles";
import { Container, OuterContainer } from "../shared.styles";
import NavLinksComponent from "../nav-links/nav-links.component";

const TopBarComponent = ({ showExtensionLinks }) => {
  return (
    <TopBar>
      <OuterContainer
        isRow={true}
        style={{ alignItems: "center", justifyContent: "space-between" }}
      >
        <Container isRow={true} style={{ gap: "1rem", alignItems: "center" }}>
          <img
            src={"images/extension.icon-48x48.png"}
            alt={"Extension icon"}
            style={{ height: "2rem" }}
          />
          <ExtensionName>Web Video Bookmarker</ExtensionName>
        </Container>
        <Navigation>
          <NavLinksComponent showExtensionLinks={showExtensionLinks} />
        </Navigation>
      </OuterContainer>
    </TopBar>
  );
};

export default TopBarComponent;
