import React, { createContext, useEffect, useState } from "react";
import { connectToActiveTab } from "../contentScripts/utility";
import { PORT_NAMES } from "../constants/constants";

export const VideoContext = createContext(null);
export const VideoProvider = ({ children }) => {
  const [state, setState] = useState({
    paused: true,
    playbackRate: 1,
    isLoading: true,
  });

  useEffect(() => {
    const connectToContentScript = async () => {
      // connect to a port
      const port = await connectToActiveTab(PORT_NAMES.VIDEO);
      // listen to messages from content script
      port.onMessage.addListener((action) => {
        if (action.payload) {
          setState({ ...action.payload, isLoading: false });
        } else {
          // TODO: figure out what to do when there's no video found
          console.log(action.message);
        }
      });
    };

    connectToContentScript().then();

    chrome.runtime.onMessage.addListener((action, sender, sendResponse) => {
      console.log(action);
    });
  }, []);

  return (
    <VideoContext.Provider value={state}>{children}</VideoContext.Provider>
  );
};
