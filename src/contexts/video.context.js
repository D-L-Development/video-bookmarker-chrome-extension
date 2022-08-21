import React, { createContext, useEffect, useRef, useState } from "react";
import {
  connectToActiveTab,
  UI_ACTIONS,
  VIDEO_ACTIONS,
} from "../contentScripts/utility";
import { PORT_NAMES } from "../constants/constants";

export const VideoContext = createContext(null);
export const VideoProvider = ({ children }) => {
  const [state, setState] = useState({
    paused: true,
    playbackRate: 1,
    isLoading: true,
  });

  const portRef = useRef(null);

  const connectToContentScript = async () => {
    // connect to a port
    portRef.current = await connectToActiveTab(PORT_NAMES.VIDEO);
    // listen to messages from content script
    portRef.current.onMessage.addListener((action) => {
      if (action.payload) {
        setState({ ...action.payload, isLoading: false });
      } else {
        // TODO: figure out what to do when there's no video found
        console.log(action.message);
      }
    });
  };

  useEffect(() => {
    // connect when the context loads
    connectToContentScript().then();
    // listen to a reconnect event. This occurs when a video is found in the page again
    // so this context gets notified to reconnect to receive updates from the content script page that has the video
    chrome.runtime.onMessage.addListener(async (action) => {
      if (action.type === UI_ACTIONS.RECONNECT) {
        portRef.current.disconnect();
        await connectToContentScript();
      } else if (action.type === VIDEO_ACTIONS.HIDE_LIVE_CONTROLS) {
        console.log(action);
        // TODO: this is not working on the bb page. The controls should be removed when a video gets removed from the DOM
        setState({ ...state, isLoading: true });
      }
    });
  }, []);

  return (
    <VideoContext.Provider value={state}>{children}</VideoContext.Provider>
  );
};
