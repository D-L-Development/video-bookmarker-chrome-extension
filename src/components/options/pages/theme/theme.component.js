import React, { useContext, useState } from "react";
import {
  defaultPalettes,
  THEME_ACTIONS,
  THEMES,
} from "../../../../constants/default-palettes";
import { ChangeThemePageContext } from "../../context/theme-page-context";
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
import { OuterContainer } from "../../shared.styles";
import { useTheme } from "styled-components";

const ThemeComponent = (props) => {
  const dispatchTheme = useContext(ChangeThemePageContext);
  const theme = useTheme();
  const [state, setState] = useState({
    selectedName: Object.keys(defaultPalettes[THEMES.LIGHT])[0],
    colorPicker: "#ffffff",
  });

  console.log({ theme });

  const handleColorPickerInput = (color) => {
    // const updatedTheme = { ...theme, [state.selectedName]: color.hex };
    setState({
      ...state,
      colorPicker: color.hex,
    });
    dispatchTheme({
      type: THEME_ACTIONS.UPDATE_CUSTOM_THEME,
      payload: { colorKey: [state.selectedName], colorValue: color.hex },
    });
  };

  const renderThemeItems = () => {
    const colorPickers = [];
    for (let key in theme) {
      colorPickers.push(
        <ColorOption key={key}>
          <ColorSquare
            selected={key === state.selectedName}
            color={theme[key]}
            name={key}
            onClick={(e) => {
              setState({
                selectedName: key,
                colorPicker: theme[key],
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
    <OuterContainer>
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
                type: THEME_ACTIONS.SAVE_CACHED_THEME,
              })
            }
          >
            Save Theme
          </ThemeSubmitButton>
        </ThemeActionsWrapper>
        <ColorsList>{renderThemeItems()}</ColorsList>
      </ThemePickerContainer>
    </OuterContainer>
  );
};

export default ThemeComponent;
