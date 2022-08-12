import React, { useEffect, useState } from "react";
import { ThemeProvider } from "styled-components";
import SpinnerIcon from "../icons/shared-icons/spinner-icon/spinner.icon";
import { defaultPalettes, THEMES } from "../constants/default-palettes";

export const THEME_KEY = "THEME";

export const CustomThemeProvider = ({ children }) => {
  const [state, setState] = useState({ isLoading: true, theme: THEMES.LIGHT });

  useEffect(() => {
    // add listener for when themes gets changed from options page
    chrome.storage.onChanged.addListener(async (changes) => {
      for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
        if (key === THEME_KEY) await changeTheme(newValue);
      }
    });

    const fetchTheme = async () => {
      const storage = await chrome.storage.sync.get(THEME_KEY);
      if (storage.hasOwnProperty(THEME_KEY)) {
        return storage[THEME_KEY];
      } else {
        await chrome.storage.sync.set({ [THEME_KEY]: THEMES.LIGHT });
        return THEMES.LIGHT;
      }
    };

    fetchTheme()
      .then((theme) => setState({ isLoading: false, theme }))
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const changeTheme = async (newTheme) => {
    if (THEMES.hasOwnProperty(newTheme)) {
      await chrome.storage.sync.set({ [THEME_KEY]: newTheme });
      setState({ theme: newTheme, isLoading: false });
    } else {
      throw new Error(`Failed to change theme to ${newTheme}`);
    }
  };

  return (
    <ThemeProvider theme={defaultPalettes[state.theme]}>
      {state.isLoading ? (
        <SpinnerIcon width={"50px"} height={"50px"} color={"white"} />
      ) : (
        children
      )}
    </ThemeProvider>
  );
};
