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
  ColorCircle,
  ColorName,
  ColorOption,
  ColorsList,
  ThemePickerContainer,
} from "./theme.styles";
import { SketchPicker } from "react-color";

const ThemeComponent = (props) => {
  const dispatchTheme = useContext(ChangeThemePageContext);
  const [state, setState] = useState({
    selectedName: null,
    colorPicker: "#ffffff",
  });

  const handleColorPickerInput = (color) => {
    setState({ ...state, colorPicker: color });
    const theme = structuredClone(defaultPalettes[THEMES.LIGHT]);
    theme[state.selectedName] = color.hex;
    dispatchTheme({ type: THEME_ACTIONS.UPDATE, payload: theme });
  };

  const renderColorPickers = () => {
    const colorPickers = [];
    for (let key in defaultPalettes[THEMES.LIGHT]) {
      const uuid = guid();
      colorPickers.push(
        <ColorOption key={uuid}>
          <ColorCircle
            color={defaultPalettes[THEMES.LIGHT][key]}
            name={key}
            onClick={(e) =>
              setState({ ...state, selectedName: e.currentTarget.name })
            }
          />
          <ColorName>{key}</ColorName>
        </ColorOption>
      );
    }
    return colorPickers;
  };

  return (
    <>
      <h1>Theme</h1>
      <ThemeControlsComponent />
      <ThemePickerContainer style={{ background: state.colorPicker.hex }}>
        <SketchPicker
          color={state.colorPicker.hex}
          onChange={(color) => handleColorPickerInput(color)}
        />
        <ColorsList>{renderColorPickers()}</ColorsList>
      </ThemePickerContainer>
    </>
  );
};

export default ThemeComponent;
