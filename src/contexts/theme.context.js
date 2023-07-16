import React, { useEffect, useState } from "react";
import { ThemeProvider } from "styled-components";
import SpinnerIcon from "../icons/shared-icons/spinner-icon/spinner.icon";
import {
  fetchTheme,
  getThemeObject,
  THEMES,
} from "../constants/default-palettes";

export const THEME_TYPE_KEY = "THEME";
export const CUSTOM_THEME_KEY = "CUSTOM_THEME_KEY";

export const CustomThemeProvider = ({ children }) => {
  const [state, setState] = useState({
    isLoading: true,
    type: THEMES.LIGHT,
    customTheme: null,
  });

  useEffect(() => {
    // add listener for when themes gets changed from options page
    chrome.storage.onChanged.addListener(async (changes) => {
      for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
        if (key === THEME_TYPE_KEY) updateTheme({ type: newValue });
        else if (key === CUSTOM_THEME_KEY)
          updateTheme({ type: THEMES.CUSTOM, customTheme: newValue });
      }
    });

    fetchTheme()
      .then((theme) => updateTheme(theme))
      .catch((e) => {
        updateTheme({ type: THEMES.LIGHT, customTheme: null });
        console.log(e);
      });
  }, []);

  const updateTheme = (theme) => {
    setState({ ...theme, isLoading: false });
  };

  return (
    <ThemeProvider theme={getThemeObject(state.type, state.customTheme)}>
      {state.isLoading ? (
        <SpinnerIcon width={"50px"} height={"50px"} color={"white"} />
      ) : (
        children
      )}
    </ThemeProvider>
  );
};
