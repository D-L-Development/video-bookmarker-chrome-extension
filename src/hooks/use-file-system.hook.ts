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

/**
 * useReducer hook fetches chrome.storage for the ROOT folder. If not found,
 * it will use the default value and update the storage
 */
export const useFileSystemHook = () => {
  const [fileSystemState, syncFileSystemDispatch] = useReducer(
    fileSystemReducer,
    { isLoading: true }
  );

  /**
   * Custom hook acts as a middle where for the dispatch function, by finishing
   * all async operations then calling the sync dispatch function
   */
  const [asyncFileSystemDispatch] = useFileSystemMW(
    fileSystemState,
    syncFileSystemDispatch
  );

  /**
   * Runs only one time. It calls the sync dispatch with the data from chrome.storage
   */
  useEffect(() => {
    asyncFileSystemDispatch({ type: fsActions.INIT });
  }, []);

  return [fileSystemState, asyncFileSystemDispatch];
};
