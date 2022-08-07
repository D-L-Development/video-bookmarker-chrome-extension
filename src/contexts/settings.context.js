import React, { createContext, useEffect, useState } from "react";
import { checkChromeLastError } from "../contentScripts/utility";

const SETTINGS = "SETTINGS";
const defaultSettings = {
  isGridView: true,
};
export const settingsActions = {
  TOGGLE_VIEW: "toggle view mode",
};
export const SettingsContext = createContext(null);
export const ChangeSettingsContext = createContext(null);

export const SettingsProvider = (props) => {
  const [state, setState] = useState({ isLoading: true });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storage = await chrome.storage.sync.get(SETTINGS);
        if (storage.hasOwnProperty(SETTINGS)) {
          setState({
            isLoading: false,
            ...storage[SETTINGS],
          });
        } else {
          const newState = { isLoading: false, ...defaultSettings };
          await saveSettingsToStorage(newState);
          setState(newState);
        }
      } catch (e) {
        throw e;
      }
    };

    fetchData().then();
  }, []);

  const dispatch = async (action) => {
    switch (action.type) {
      case settingsActions.TOGGLE_VIEW:
        const newState = {
          ...state,
          isGridView: !state.isGridView,
        };
        await saveSettingsToStorage(newState);
        setState(newState);
        break;
    }
  };

  const saveSettingsToStorage = async (settings) => {
    try {
      // don't save the loading state to storage
      delete settings.isLoading;
      await chrome.storage.sync.set({ [SETTINGS]: settings });
      checkChromeLastError();
    } catch (e) {
      throw e;
    }
  };

  return (
    <SettingsContext.Provider value={state}>
      <ChangeSettingsContext.Provider value={dispatch}>
        {props.children}
      </ChangeSettingsContext.Provider>
    </SettingsContext.Provider>
  );
};
