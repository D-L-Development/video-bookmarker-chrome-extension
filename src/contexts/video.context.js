import React, { createContext, useEffect, useState } from "react";
import { connectToActiveTab } from "../contentScripts/utility";

export const VideoContext = createContext(null);
export const VideoProvider = ({ children }) => {
  const [state, setState] = useState({
    paused: false,
    playbackRate: 1,
    isLoading: true,
  });

  useEffect(() => {
    const connectToContentScript = async () => {
      // connect to a port
      const port = await connectToActiveTab("video-state");
      // listen to messages from content script
      port.onMessage.addListener((action) => {
        setState({ ...action.payload, isLoading: false });
        console.log(action);
      });
    };

    connectToContentScript().then();
  }, []);

  return (
    <VideoContext.Provider value={state}>{children}</VideoContext.Provider>
  );
};
