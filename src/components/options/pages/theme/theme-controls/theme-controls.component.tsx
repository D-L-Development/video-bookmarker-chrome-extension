import React, { useContext, useEffect, useState } from "react";
import {
  ChangeThemePageContext,
  THEME_ACTIONS,
} from "../../../context/theme-page-context";
import { THEME_KEY } from "../../../../../contexts/theme.context";
import { THEMES } from "../../../../../constants/default-palettes.ts";
import SwitchComponent from "../../switch/switch.component";

const ThemeControlsComponent = () => {
  const [state, setState] = useState({
    isLoading: true,
    isDarkTheme: false,
    isCustomTheme: false,
  });

  const dispatchTheme = useContext(ChangeThemePageContext);

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

  useEffect(() => {
    if (!state.isCustomTheme && !state.isLoading) {
      dispatchTheme({
        type: THEME_ACTIONS.CHANGE,
        payload: state.isDarkTheme ? THEMES.DARK : THEMES.LIGHT,
      });
    }
  }, [state.isCustomTheme]);

  const handleDarkModeToggle = async (e) => {
    try {
      const { checked } = e.target;
      // update the theme in the context
      await dispatchTheme({
        type: THEME_ACTIONS.CHANGE,
        payload: checked ? THEMES.DARK : THEMES.LIGHT,
      });
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

  return (
    <>
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
        </>
      )}
    </>
  );
};

export default ThemeControlsComponent;
