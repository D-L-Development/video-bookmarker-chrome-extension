import React, { useContext, useEffect, useState } from "react";
import SwitchComponent from "../switch/switch.component";
import { THEME_KEY } from "../../../../contexts/theme.context";
import {
  defaultPalettes,
  THEMES,
} from "../../../../constants/default-palettes";
import { ChangeThemePageContext } from "../../context/theme-page-context";
import { guid } from "../../../../contentScripts/utility";

const ThemeComponent = (props) => {
  const [state, setState] = useState({
    isLoading: true,
    isDarkTheme: false,
    isCustomTheme: false,
  });

  const { changeTheme, updateTheme } = useContext(ChangeThemePageContext);

  useEffect(() => {
    const fetchStorage = async () => {
      const storage = await chrome.storage.sync.get(THEME_KEY);
      if (storage.hasOwnProperty(THEME_KEY)) {
        return typeof storage[THEME_KEY] === "object"
          ? THEMES.CUSTOM
          : storage[THEME_KEY];
      } else {
        return THEMES.LIGHT;
      }
    };

    fetchStorage()
      .then((theme) => {
        setState({
          isCustomTheme: theme === THEMES.CUSTOM,
          isDarkTheme: theme === THEMES.DARK,
          isLoading: false,
        });
      })
      .catch((e) => {
        setState({ ...state, isLoading: false });
        console.log(e);
      });
  }, []);

  const handleDarkModeToggle = async (e) => {
    try {
      const { checked } = e.target;
      // update the theme in the context
      await changeTheme(checked ? THEMES.DARK : THEMES.LIGHT);
      // update the toggle switch state
      setState({ ...state, isDarkTheme: checked });
    } catch (e) {
      throw e;
    }
  };

  const handleCustomThemeToggle = async (e) => {
    try {
      // update the toggle switch
      // TODO: update the state here to whatever the "default" custom theme is
      setState({ ...state, isCustomTheme: e.target.checked });
    } catch (e) {
      throw e;
    }
  };

  const handleColorPickerInput = (e) => {
    const theme = structuredClone(defaultPalettes[THEMES.LIGHT]);
    theme[e.target.name] = e.target.value;
    updateTheme(theme);
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
      {!state.isLoading && (
        <>
          <div style={{ display: "flex", gap: "1rem" }}>
            <span
              style={{ color: `${state.isCustomTheme ? "grey" : "black"}` }}
            >
              Dark mode:
            </span>
            <SwitchComponent
              handleToggle={handleDarkModeToggle}
              checked={state.isDarkTheme}
              disabled={state.isCustomTheme}
            />
          </div>
          <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
            <span>Custom theme:</span>
            <SwitchComponent
              handleToggle={handleCustomThemeToggle}
              checked={state.isCustomTheme}
            />
          </div>
          <div>{renderColorPickers()}</div>
        </>
      )}
    </>
  );
};

export default ThemeComponent;
