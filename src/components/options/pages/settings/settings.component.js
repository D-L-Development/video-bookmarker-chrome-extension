import React, { useEffect, useState } from "react";
import { STORAGE_KEYS } from "../../../../constants/constants";
import SwitchComponent from "../switch/switch.component";
import { Content } from "../home/home.styles";

const { SETTINGS } = STORAGE_KEYS;
const SETTINGS_OPTIONS = {
  resumeAfterAction: "resumeAfterAction",
  pauseVideoOnAction: "pauseVideoOnAction",
};

const SettingsComponent = (props) => {
  const [state, setState] = useState({
    isLoading: true,
    pauseVideoOnAction: true,
    resumeAfterAction: true,
  });

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const storage = await chrome.storage.sync.get(SETTINGS);
        if (storage.hasOwnProperty(SETTINGS)) {
          // return needed settings from storage
          const { pauseVideoOnAction, resumeAfterAction } = storage[SETTINGS];
          return { pauseVideoOnAction, resumeAfterAction };
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

  const handlePauseVideoSettingChange = async (type) => {
    try {
      const storage = await chrome.storage.sync.get(SETTINGS);
      // update the storage
      switch (type) {
        case SETTINGS_OPTIONS.pauseVideoOnAction:
          storage[SETTINGS].pauseVideoOnAction = !state.pauseVideoOnAction;
          break;
        case SETTINGS_OPTIONS.resumeAfterAction:
          storage[SETTINGS].resumeAfterAction = !state.resumeAfterAction;
          break;
      }
      // save storage
      await chrome.storage.sync.set(storage);
      // update state
      setState({
        ...state,
        pauseVideoOnAction: storage[SETTINGS].pauseVideoOnAction,
        resumeAfterAction: storage[SETTINGS].resumeAfterAction,
      });
    } catch (e) {
      throw e;
    }
  };

  return (
    !state.isLoading && (
      <Content>
        <div>
          <span>Auto pause video when performing bookmark actions:</span>
          <SwitchComponent
            handleToggle={() =>
              handlePauseVideoSettingChange(SETTINGS_OPTIONS.pauseVideoOnAction)
            }
            checked={state.pauseVideoOnAction}
          />
        </div>
        <div>
          <span>
            Auto resume video when done editing or creating a bookmark:
          </span>
          <SwitchComponent
            handleToggle={() =>
              handlePauseVideoSettingChange(SETTINGS_OPTIONS.resumeAfterAction)
            }
            checked={state.resumeAfterAction}
          />
        </div>
      </Content>
    )
  );
};

export default SettingsComponent;
