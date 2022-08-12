import React, { useContext } from "react";
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

const ThemeComponent = (props) => {
  console.log("RERENDER");

  const dispatchTheme = useContext(ChangeThemePageContext);

  const handleColorPickerInput = (e) => {
    const theme = structuredClone(defaultPalettes[THEMES.LIGHT]);
    theme[e.target.name] = e.target.value;
    dispatchTheme({ type: THEME_ACTIONS.UPDATE, payload: theme });
  };

  const renderColorPickers = () => {
    const colorPickers = [];
    for (let key in defaultPalettes[THEMES.LIGHT]) {
      const uuid = guid();
      colorPickers.push(
        <input
          type={"color"}
          key={uuid}
          name={key}
          onInput={handleColorPickerInput}
        />
      );
    }
    return colorPickers;
  };

  return (
    <>
      <h1>Theme</h1>
      <ThemeControlsComponent />
      <div>{renderColorPickers()}</div>
    </>
  );
};

export default ThemeComponent;
