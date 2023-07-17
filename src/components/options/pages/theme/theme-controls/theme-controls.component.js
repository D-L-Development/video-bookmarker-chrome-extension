import React, { useContext } from "react";
import { ChangeThemePageContext } from "../../../context/theme-page-context";
import {
  THEME_ACTIONS,
  THEMES,
} from "../../../../../constants/default-palettes";
import ButtonGroupComponent from "../button-group/button-group.component";
import { useTheme } from "styled-components";
import { Container } from "../../../shared.styles";
import { COLORS } from "../../../top-bar/top-bar.styles";

const ThemeControlsComponent = () => {
  const dispatchTheme = useContext(ChangeThemePageContext);
  const theme = useTheme();

  return (
    <Container style={{ alignItems: "center", gap: "1rem", marginTop: "3rem" }}>
      <h1 style={{ color: COLORS.TEXT_DARK }}>
        Toggle the theme that makes you happy :)
      </h1>
      <ButtonGroupComponent
        buttons={Object.values(THEMES)}
        handleClick={(type) =>
          dispatchTheme({
            type: THEME_ACTIONS.CHANGE_THEME_TYPE,
            payload: { type },
          })
        }
        activeBtn={theme.type}
      />
    </Container>
  );
};

export default ThemeControlsComponent;
