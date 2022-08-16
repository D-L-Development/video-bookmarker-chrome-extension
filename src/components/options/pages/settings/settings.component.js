import React, { useEffect, useState } from "react";
import { STORAGE_KEYS } from "../../../../constants/constants";
import SwitchComponent from "../switch/switch.component";

const { SETTINGS } = STORAGE_KEYS;

const SettingsComponent = (props) => {
  const [state, setState] = useState({
    isLoading: true,
    pauseVideoOnAction: true,
  });

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const storage = await chrome.storage.sync.get(SETTINGS);
        if (storage.hasOwnProperty(SETTINGS)) {
          // return needed settings from storage
          return { pauseVideoOnAction: storage[SETTINGS].pauseVideoOnAction };
        } else {
          throw new Error("Failed to fetch storage");
        }
      } catch (e) {
        throw e;
      }
    };

    fetchSettings()
      .then((settings) => setState({ isLoading: false, ...settings }))
      .catch((e) => {
        setState({ isLoading: false });
        console.log(e);
      });
  }, []);

  const handlePauseVideoSettingChange = async () => {
    try {
      const storage = await chrome.storage.sync.get(SETTINGS);
      // update the storage
      storage[SETTINGS].pauseVideoOnAction = !state.pauseVideoOnAction;
      // save storage
      await chrome.storage.sync.set(storage);
      // update state
      setState({ ...state, pauseVideoOnAction: !state.pauseVideoOnAction });
    } catch (e) {
      throw e;
    }
  };

  return (
    !state.isLoading && (
      <div>
        <span>Auto pause video when performing bookmark actions:</span>
        <SwitchComponent
          handleToggle={handlePauseVideoSettingChange}
          checked={state.pauseVideoOnAction}
        />
      </div>
    )
  );
};

export default SettingsComponent;
