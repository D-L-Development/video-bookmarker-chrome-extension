import React, { useEffect, useState } from "react";
import SwitchComponent from "../switch/switch.component";
import { THEME_KEY } from "../../../../contexts/theme.context";
import { THEMES } from "../../../../constants/default-palettes";

const ThemeComponent = (props) => {
  const [state, setState] = useState({
    isLoading: true,
    isDarkTheme: false,
    isCustomTheme: false,
  });

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
      setState({ ...state, isDarkTheme: e.target.checked });
    } catch (e) {
      throw e;
    }
  };

  const handleCustomThemeToggle = async (e) => {
    try {
      setState({ ...state, isCustomTheme: e.target.checked });
    } catch (e) {
      throw e;
    }
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
            />
          </div>
          <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
            <span>Custom theme:</span>
            <SwitchComponent
              handleToggle={handleCustomThemeToggle}
              checked={state.isCustomTheme}
            />
          </div>
        </>
      )}
    </>
  );
};

export default ThemeComponent;
