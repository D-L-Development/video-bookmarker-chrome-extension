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
import { OuterContainer } from "../../shared.styles";
import ButtonGroupComponent from "./button-group/button-group.component";

const themeOptions = ["Light", "Dark", "Custom"];

const ThemeComponent = (props) => {
  const dispatchTheme = useContext(ChangeThemePageContext);
  const [state, setState] = useState({
    theme: defaultPalettes[THEMES.LIGHT],
    selectedName: Object.keys(defaultPalettes[THEMES.LIGHT])[0],
    colorPicker: "#ffffff",
  });

  const [themeOption, setThemeOption] = useState(themeOptions[0]);

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
    <OuterContainer>
      <ButtonGroupComponent
        buttons={themeOptions}
        handleClick={setThemeOption}
        activeBtn={themeOption}
      />
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
    </OuterContainer>
  );
};

export default ThemeComponent;
