import React, { useContext } from "react";
import { ChangeThemePageContext } from "../../../context/theme-page-context";
import {
  THEME_ACTIONS,
  THEMES,
} from "../../../../../constants/default-palettes";
import ButtonGroupComponent from "../button-group/button-group.component";
import { useTheme } from "styled-components";
import { SecondaryText } from "../../home/home.styles";
import { Container } from "../../../shared.styles";

const ThemeControlsComponent = () => {
  const dispatchTheme = useContext(ChangeThemePageContext);
  const theme = useTheme();

  return (
    <Container style={{ alignItems: "center", gap: "1rem", marginTop: "3rem" }}>
      <SecondaryText>Toggle the theme that makes you happy :)</SecondaryText>
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
