import React, { createContext } from "react";
import { useFileSystemHook } from "../hooks/use-file-system.hook";

export const FileSystemContext = createContext(null);
export const fsDispatchContext = createContext(null);

export const FileSystemProvider = ({ children }) => {
  const [fileSystem, fsDispatch] = useFileSystemHook();

  return (
    <FileSystemContext.Provider value={fileSystem}>
      <fsDispatchContext.Provider value={fsDispatch}>
        {children}
      </fsDispatchContext.Provider>
    </FileSystemContext.Provider>
  );
};
