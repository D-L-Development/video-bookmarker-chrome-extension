import React, { useContext, useState } from "react";
import {
  defaultPalettes,
  THEMES,
} from "../../../../constants/default-palettes";
import { guid } from "../../../../contentScripts/utility";
import {
  ChangeThemePageContext,
  THEME_ACTIONS,
} from "../../context/theme-page-context";
import ThemeControlsComponent from "./theme-controls/theme-controls.component";
import {
  ColorName,
  ColorOption,
  ColorPicker,
  ColorsList,
  ColorSquare,
  ThemeActionsWrapper,
  ThemePickerContainer,
  ThemeSubmitButton,
} from "./theme.styles";
import { Container } from "../../shared.styles";

// const colors = {
//   thing: "HEX"
// }

const ThemeComponent = (props) => {
  const dispatchTheme = useContext(ChangeThemePageContext);
  const [state, setState] = useState({
    theme: defaultPalettes[THEMES.LIGHT],
    selectedName: Object.keys(defaultPalettes[THEMES.LIGHT])[0],
    colorPicker: "#ffffff",
  });

  const handleColorPickerInput = (color) => {
    const theme = { ...state.theme, [state.selectedName]: color.hex };
    setState({
      ...state,
      colorPicker: color.hex,
      theme,
    });
    dispatchTheme({ type: THEME_ACTIONS.UPDATE, payload: theme });
  };

  const renderThemeItems = () => {
    const colorPickers = [];
    for (let key in state.theme) {
      const uuid = guid();
      colorPickers.push(
        <ColorOption key={uuid}>
          <ColorSquare
            selected={key === state.selectedName}
            color={state.theme[key]}
            name={key}
            onClick={(e) => {
              setState({
                ...state,
                selectedName: key,
                colorPicker: state.theme[key],
              });
            }}
          >
            <ColorName>{key}</ColorName>
          </ColorSquare>
        </ColorOption>
      );
    }
    return colorPickers;
  };

  return (
    <Container>
      <h1>Theme</h1>
      <ThemeControlsComponent />
      <ThemePickerContainer>
        <ThemeActionsWrapper>
          <ColorPicker
            color={state.colorPicker}
            onChange={(color) => handleColorPickerInput(color)}
          />

          <ThemeSubmitButton
            onClick={() =>
              dispatchTheme({
                type: THEME_ACTIONS.CHANGE,
                payload: state.theme,
              })
            }
          >
            Save Theme
          </ThemeSubmitButton>
        </ThemeActionsWrapper>
        <ColorsList>{renderThemeItems()}</ColorsList>
      </ThemePickerContainer>
    </Container>
  );
};

export default ThemeComponent;
