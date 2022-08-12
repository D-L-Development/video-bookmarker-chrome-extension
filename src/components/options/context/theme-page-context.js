import React, { createContext, useEffect, useState } from "react";
import { ThemeProvider } from "styled-components";
import { THEME_KEY } from "../../../contexts/theme.context";
import { getTheme, THEMES } from "../../../constants/default-palettes";

export const ChangeThemePageContext = createContext(null);

export const ThemePageContextProvider = ({ children }) => {
  const [state, setState] = useState({ theme: THEMES.LIGHT, isLoading: true });

  useEffect(() => {
    const fetchTheme = async () => {
      const storage = await chrome.storage.sync.get(THEME_KEY);
      if (storage.hasOwnProperty(THEME_KEY)) {
        return storage[THEME_KEY];
      } else {
        return THEMES.LIGHT;
      }
    };

    fetchTheme()
      .then((theme) => {
        setState({ isLoading: false, theme });
      })
      .catch((e) => {
        throw e;
      });
  }, []);

  const changeTheme = async (theme) => {
    await chrome.storage.sync.set({ [THEME_KEY]: theme });
    setState({ ...state, theme });
  };

  const updateTheme = async (theme) => {
    setState({ ...state, theme });
  };

  return (
    <ChangeThemePageContext.Provider value={{ changeTheme, updateTheme }}>
      <ThemeProvider theme={getTheme(state.theme)}>
        {!state.isLoading && children}
      </ThemeProvider>
    </ChangeThemePageContext.Provider>
  );
};
