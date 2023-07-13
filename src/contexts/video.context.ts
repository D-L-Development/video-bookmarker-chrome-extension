import React, { createContext, useEffect, useState } from "react";
import {
  sendMessageToActiveTab,
  VIDEO_ACTIONS,
} from "../contentScripts/utility";

export const VideoContext = createContext(null);
export const VideoProvider = ({ children }) => {
  const [state, setState] = useState({
    paused: true,
    playbackRate: 1,
    isLoading: true,
  });

  useEffect(() => {
    // send message to videoManager to see if there's a video
    // if there is one, the listener below will update the state
    sendMessageToActiveTab({ type: VIDEO_ACTIONS.INIT_STATE });
    // listen to messages from videoManager content script
    chrome.runtime.onMessage.addListener((action) => {
      if (action.type === VIDEO_ACTIONS.HIDE_LIVE_CONTROLS) {
        setState({ ...state, isLoading: true });
      } else if (action.type === VIDEO_ACTIONS.UPDATE_STATE) {
        setState({ ...action.payload, isLoading: false });
      }
    });
  }, []);

  return (
    <VideoContext.Provider value={state}>{children}</VideoContext.Provider>
  );
};
