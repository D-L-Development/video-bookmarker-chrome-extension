import React, { createContext, useEffect, useState } from "react";
import { checkChromeLastError } from "../contentScripts/utility";
import { STORAGE_KEYS } from "../constants/constants";
import { DefaultProps } from "../models/shared";

export interface Settings {
  isGridView: boolean;
  pauseVideoOnAction: boolean;
  resumeAfterAction: boolean;
  isLoading: boolean;
}

const defaultSettings = {
  isGridView: true,
  pauseVideoOnAction: true,
  resumeAfterAction: true,
  isLoading: false,
};
export const settingsActions = {
  TOGGLE_VIEW: "toggle view mode",
  TOGGLE_AUTO_PAUSE: "toggle auto pause",
};
export const SettingsContext = createContext(null);
export const ChangeSettingsContext = createContext(null);

export const SettingsProvider = ({ children }: DefaultProps) => {
  const [state, setState] = useState({ isLoading: true });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storage = await chrome.storage.sync.get(STORAGE_KEYS.SETTINGS);
        if (storage.hasOwnProperty(STORAGE_KEYS.SETTINGS)) {
          return {
            isLoading: false,
            ...storage[STORAGE_KEYS.SETTINGS],
          };
        } else {
          const newState = defaultSettings;
          await saveSettingsToStorage(newState);
          return newState;
        }
      } catch (e) {
        throw e;
      }
    };

    const handleStorageUpdate = (changes) => {
      for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
        if (key === STORAGE_KEYS.SETTINGS) {
          setState({ ...state, ...newValue, isLoading: false });
        }
      }
    };

    fetchData().then((state) => {
      setState(state);
      // add listener after the storage is set, so it won't run the first time
      chrome.storage.onChanged.addListener(handleStorageUpdate);
    });

    return () => chrome.storage.onChanged.removeListener(handleStorageUpdate);
  }, []);

  const dispatch = async (action) => {
    let newState = {};
    switch (action.type) {
      case settingsActions.TOGGLE_VIEW:
        newState = {
          ...state,
          isGridView: !state.isGridView,
        };
        await saveSettingsToStorage(newState);
        setState(newState);
        break;
    }
  };

  const saveSettingsToStorage = async (settings: Settings) => {
    try {
      // don't save the loading state to storage
      delete settings.isLoading;
      await chrome.storage.sync.set({ [STORAGE_KEYS.SETTINGS]: settings });
      checkChromeLastError();
    } catch (e) {
      throw e;
    }
  };

  return (
    <SettingsContext.Provider value={state}>
      <ChangeSettingsContext.Provider value={dispatch}>
        {children}
      </ChangeSettingsContext.Provider>
    </SettingsContext.Provider>
  );
};
