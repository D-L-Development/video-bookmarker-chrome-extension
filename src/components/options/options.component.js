import React, { useRef } from "react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import HomeComponent from "./pages/home/home.component";
import TopBarComponent from "./top-bar/top-bar.component";
import SettingsComponent from "./pages/settings/settings.component";
import ThemeComponent from "./pages/theme/theme.component";
import { COLORS } from "./top-bar/top-bar.styles";
import { OuterContainer } from "./shared.styles";
import { FooterExtName, FooterLinks } from "./pages/home/home.styles";
import { EXTENSION_NAME } from "./data/extensionDetails";
import NavLinksComponent from "./nav-links/nav-links.component";
import AboutComponent from "./pages/about/about.component";

const OptionsComponent = ({ isExtension = true }) => {
  const yearRef = useRef(new Date().getFullYear());

  return (
    <MemoryRouter>
      <TopBarComponent showExtensionLinks={isExtension} />
      <Routes>
        <Route path={"/"} element={<HomeComponent />} />
        {isExtension && (
          <>
            <Route path={"/settings"} element={<SettingsComponent />} />
            <Route path={"/theme"} element={<ThemeComponent />} />
          </>
        )}
        <Route path={"/about"} element={<AboutComponent />} />
      </Routes>
      <footer style={{ backgroundColor: COLORS.TEXT_DARK, marginTop: "auto" }}>
        <OuterContainer>
          <FooterLinks>
            <NavLinksComponent
              showExtensionLinks={isExtension}
              isFooter={true}
            />
            <FooterExtName>
              <span>
                &copy; {yearRef.current} {EXTENSION_NAME}
              </span>
              <span>
                Created by{" "}
                <a href={"https://www.dakoalbeik.com"} target={"_blank"}>
                  Dako Albeik
                </a>
              </span>
            </FooterExtName>
          </FooterLinks>
        </OuterContainer>
      </footer>
    </MemoryRouter>
  );
};

export default OptionsComponent;
