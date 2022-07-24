import { useEffect, useReducer } from "react";
import fileSystemReducer, { fsActions } from "../reducers/file-system.reducer";
import { useFileSystemMW } from "./use-file-system-mw.hook";

/**
 * the state has the format below
 *
 *  const fileSystemState = {
 *    files: [Object, Object],
 *    folders: [Object, Object],
 *    current: {uuid: "ROOT", name: "ROOT", date: null | mm/dd/yyyy},
 *    parent: {uuid: "ROOT", name: "ROOT", date: null | mm/dd/yyyy} | null
 *  };
 */

const ROOT = "ROOT";
const rootDir = {
  folders: [
    { uuid: "1234-5678-9101", name: "First Folder" },
    { uuid: "3212-3421-3534", name: "Second Folder" },
  ],
  files: [],
  current: { uuid: ROOT, name: "Root Folder", date: null },
  parent: null,
};

/**
 * useReducer hook fetches chrome.storage for the ROOT folder. If not found,
 * it will use the default value and update the storage
 *
 * @param defaultVal
 * @param reducer
 * @returns {[S,(() => void)]}
 */
export const useFileSystemHook = () => {
  const [fileSystemState, syncFileSystemDispatch] = useReducer(
    fileSystemReducer,
    null
  );

  /**
   * Custom hook acts as a middle where for the dispatch function, by finishing
   * all async operations then calling the sync dispatch function
   */
  const [asyncFileSystemDispatch] = useFileSystemMW(syncFileSystemDispatch);

  /**
   * Runs only one time. It calls the sync dispatch with the data from chrome.storage
   */
  useEffect(() => {
    const fetchStorage = async () => {
      try {
        const storedRootFolder = await chrome.storage.sync.get(ROOT);
        if (chrome.runtime.lastError) {
          console.log(chrome.runtime.lastError);
        }
        // if not found, use the default value and save it to chrome.storage
        if (storedRootFolder[ROOT]) {
          const { current, parent } = rootDir;
          syncFileSystemDispatch({
            type: fsActions.INIT,
            payload: { ...storedRootFolder[ROOT], current, parent },
          });
        } else {
          syncFileSystemDispatch({
            type: fsActions.INIT,
            payload: rootDir,
          });
        }
      } catch (e) {
        throw e;
      }
    };
    fetchStorage();
  }, []);

  /**
   * Updates the current folder's key in chrome.storage when there's an update to the state
   */
  useEffect(() => {
    console.log("File system state changed");
    console.log(fileSystemState);
    const saveStateToStorage = async () => {
      const { current, files, folders } = fileSystemState;
      await chrome.storage.sync.set({
        [current.uuid]: {
          folders,
          files,
        },
      });
    };

    fileSystemState && saveStateToStorage();
  }, [fileSystemState]);

  return [fileSystemState, asyncFileSystemDispatch];
};
