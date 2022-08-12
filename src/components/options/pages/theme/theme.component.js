import React, { useEffect, useState } from "react";
import SwitchComponent from "../switch/switch.component";
import { THEME_KEY } from "../../../../contexts/theme.context";
import { THEMES } from "../../../../constants/default-palettes";

const ThemeComponent = (props) => {
  const [state, setState] = useState({ isDarkMode: false, isLoading: true });

  useEffect(() => {
    const fetchStorage = async () => {
      const storage = await chrome.storage.sync.get(THEME_KEY);
      if (storage.hasOwnProperty(THEME_KEY)) {
        return storage[THEME_KEY] === THEMES.DARK;
      } else {
        return false;
      }
    };

    fetchStorage()
      .then((isDarkMode) => {
        setState({ isDarkMode, isLoading: false });
      })
      .catch((e) => {
        setState({ ...state, isLoading: false });
        console.log(e);
      });
  }, []);

  const handleDarkModeToggle = async () => {
    try {
      await chrome.storage.sync.set({
        [THEME_KEY]: state.isDarkMode ? THEMES.LIGHT : THEMES.DARK,
      });
      setState({ ...state, isDarkMode: !state.isDarkMode });
    } catch (e) {
      throw e;
    }
  };

  return (
    <>
      <h1>Theme</h1>
      {!state.isLoading && (
        <SwitchComponent
          handleToggle={handleDarkModeToggle}
          checked={state.isDarkMode}
        />
      )}
    </>
  );
};

export default ThemeComponent;
