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
import { rgbaToCSS } from "../../../../constants/color-functions";

const IGNORED_KEYS = ["type", "error_c", "selected_folder_c"];

const ThemeComponent = (props) => {
  const dispatchTheme = useContext(ChangeThemePageContext);
  const theme = useTheme();
  const [state, setState] = useState({
    selectedName: Object.keys(defaultPalettes[THEMES.LIGHT])[0],
    colorPicker: "#ffffff",
  });

  const handleColorPickerInput = (color) => {
    setState({
      ...state,
      colorPicker: color.rgb,
    });

    dispatchTheme({
      type: THEME_ACTIONS.UPDATE_CUSTOM_THEME,
      payload: {
        colorKey: [state.selectedName],
        colorValue: rgbaToCSS(color.rgb),
      },
    });
  };

  const renderThemeItems = () => {
    const colorPickers = [];
    for (const key in theme) {
      if (IGNORED_KEYS.includes(key)) continue;
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
        {theme.type === THEMES.CUSTOM && (
          <ThemeActionsWrapper>
            <ColorPicker
              disableAlpha={false}
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
        )}
        <ColorsList>{renderThemeItems()}</ColorsList>
      </ThemePickerContainer>
    </OuterContainer>
  );
};

export default ThemeComponent;
