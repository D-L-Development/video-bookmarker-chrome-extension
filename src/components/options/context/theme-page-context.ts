import React, { createContext, useEffect, useState } from "react";
import { ThemeProvider } from "styled-components";
import { THEME_KEY } from "../../../contexts/theme.context";
import { getTheme, THEMES } from "../../../constants/default-palettes.ts";

export const ChangeThemePageContext = createContext(null);

export const THEME_ACTIONS = {
  UPDATE: "UPDATE",
  CHANGE: "CHANGE",
};

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

  const dispatch = async (action) => {
    if (action.type === THEME_ACTIONS.CHANGE) {
      await changeTheme(action.payload);
    } else if (action.type === THEME_ACTIONS.UPDATE) {
      await updateTheme(action.payload);
    } else {
      throw new Error(
        `Dispatched action of type ${action.type} is unrecognized!`
      );
    }
  };

  return (
    <ChangeThemePageContext.Provider value={dispatch}>
      <ThemeProvider theme={getTheme(state.theme)}>
        {!state.isLoading && children}
      </ThemeProvider>
    </ChangeThemePageContext.Provider>
  );
};
