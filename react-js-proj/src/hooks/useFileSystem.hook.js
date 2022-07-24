import { useEffect, useReducer } from "react";
import fileSystemReducer from "../reducers/file-system.reducer";

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
  folders: ["My folder", "Your folder"],
  files: ["File_1.svg", "File_2.svg"],
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
  const [fileSystemState, fileSystemDispatch] = useReducer(
    fileSystemReducer,
    rootDir,
    async () => {
      let value;
      try {
        const storedRootFolder = await chrome.storage.sync.get(ROOT);
        if (chrome.runtime.lastError) {
          throw chrome.runtime.lastError;
        }
        // if not found, use the default value and save it to chrome.storage
        if (storedRootFolder[ROOT]) {
          const { current, parent } = rootDir;
          value = { ...storedRootFolder[ROOT], current, parent };
        } else {
          await chrome.storage.sync.set(rootDir);
          value = rootDir;
        }
        console.log(value);
      } catch (e) {
        throw e;
      }
      return value;
    }
  );

  // async getMoveFolderInfo = (uuid)=>{
  //   const res = await chrome.storage.sync.get(uuid);
  //   fileSystemDispatch({type: "MOVE", payload: res});
  // }

  useEffect(() => {
    console.log("File system state changed");
  }, [fileSystemState]);

  return [fileSystemState, fileSystemDispatch];
};
