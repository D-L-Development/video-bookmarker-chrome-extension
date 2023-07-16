import React, { createContext, useEffect, useState } from "react";
import { ThemeProvider } from "styled-components";
import {
  CUSTOM_THEME_KEY,
  THEME_TYPE_KEY,
} from "../../../contexts/theme.context";
import {
  defaultPalettes,
  fetchTheme,
  getThemeObject,
  THEME_ACTIONS,
  THEMES,
} from "../../../constants/default-palettes";

export const ChangeThemePageContext = createContext(null);

export const ThemePageContextProvider = ({ children }) => {
  const [state, setState] = useState({
    type: THEMES.LIGHT,
    customTheme: null,
    isLoading: true,
  });

  useEffect(() => {
    fetchTheme()
      .then((theme) => {
        setState({ isLoading: false, ...theme });
      })
      .catch((e) => {
        throw e;
      });
  }, []);

  /**
   *
   * @param type {string}
   * @return {Promise<void>}
   */
  const updateThemeType = async (type) => {
    if (state.type === type) return;
    // if custom theme is toggled, check the cached state and then the storage
    const theme = { type, customTheme: state.customTheme };
    if (type === THEMES.CUSTOM) {
      // if non in the cache get it from the storage
      if (!theme.customTheme) {
        const storage = await chrome.storage.sync.get(CUSTOM_THEME_KEY);
        theme.customTheme =
          storage[CUSTOM_THEME_KEY] || defaultPalettes[THEMES.LIGHT];
      }
    }
    await chrome.storage.sync.set({
      [THEME_TYPE_KEY]: type,
    });
    setState({ ...state, ...theme });
  };

  const updateCustomTheme = (colorKey, colorValue) => {
    setState({
      ...state,
      type: THEMES.CUSTOM,
      customTheme: { ...state.customTheme, [colorKey]: colorValue },
    });
  };

  const saveCustomTheme = async () => {
    await chrome.storage.sync.set({
      [THEME_TYPE_KEY]: THEMES.CUSTOM,
      [CUSTOM_THEME_KEY]: state.customTheme || defaultPalettes[THEMES.LIGHT],
    });
  };

  const dispatch = async (action) => {
    switch (action.type) {
      case THEME_ACTIONS.CHANGE_THEME_TYPE:
        return await updateThemeType(action.payload.type);
      case THEME_ACTIONS.UPDATE_CUSTOM_THEME:
        return updateCustomTheme(
          action.payload.colorKey,
          action.payload.colorValue
        );
      case THEME_ACTIONS.SAVE_CACHED_THEME:
        return await saveCustomTheme();
      default:
        throw new Error(
          `Dispatched action of type ${action.type} is unrecognized!`
        );
    }
  };

  return (
    <ChangeThemePageContext.Provider value={dispatch}>
      {/* Provide the theme object to the children */}
      <ThemeProvider theme={getThemeObject(state.type, state.customTheme)}>
        {!state.isLoading && children}
      </ThemeProvider>
    </ChangeThemePageContext.Provider>
  );
};
