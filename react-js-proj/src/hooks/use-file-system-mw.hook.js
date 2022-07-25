import { fsActions } from "../reducers/file-system.reducer";
import { FS_Item } from "../classes/file.class";
import { guid } from "../contentScripts/utility";

const ROOT = "ROOT";
const rootDir = {
  folders: [],
  files: [],
  current: { uuid: ROOT, name: "Root Folder", date: null },
  parent: null,
};

/**
 * Since react useReducer doesn't support async operations, this function
 * acts as a middleware to handle all async storage operations, and then
 * calls the sync dispatch when all async operations are done.
 *
 * @param fileSystemState - the current local state in react
 * @param syncFileSystemDispatch - function to dispatch actions to local state
 * @returns {function} - returns the async dispatch function to be used
 *                       by react components through the context
 */
export const useFileSystemMW = (fileSystemState, syncFileSystemDispatch) => {
  async function addFolder({ type, payload }) {
    const { current } = fileSystemState;
    try {
      const storage = await chrome.storage.sync.get(current.uuid);
      const folder = new FS_Item(guid(), payload.name);
      storage[current.uuid].folders.push(folder);
      storage[folder.uuid] = {
        folders: [],
        files: [],
      };
      await chrome.storage.sync.set(storage);
      folder.selected = false;
      syncFileSystemDispatch({ type, payload: { folder } });
    } catch (e) {
      throw e;
    }
  }

  const initStateAndStorage = async () => {
    try {
      const storage = await chrome.storage.sync.get(ROOT);
      if (chrome.runtime.lastError) {
        console.log(chrome.runtime.lastError);
      }
      // if not found, use the default value and save it to chrome.storage
      if (storage[ROOT]) {
        const { current, parent } = rootDir;
        syncFileSystemDispatch({
          type: fsActions.INIT,
          payload: { ...storage[ROOT], current, parent },
        });
      } else {
        await chrome.storage.sync.set({
          [ROOT]: {
            folders: [],
            files: [],
          },
        });
        syncFileSystemDispatch({
          type: fsActions.INIT,
          payload: rootDir,
        });
      }
    } catch (e) {
      throw e;
    }
  };

  async function removeFolder({ type, payload }) {
    const { current } = fileSystemState;
    try {
      const storage = await chrome.storage.sync.get(current.uuid);
      const index = storage[current.uuid].folders.findIndex(
        (folder) => folder.uuid === payload.uuid
      );

      if (index > -1) {
        storage[current.uuid].folders.splice(index, 1);
        await Promise.all([
          chrome.storage.sync.set(storage),
          chrome.storage.sync.remove(payload.uuid),
        ]);
        syncFileSystemDispatch({ type, payload });
      }
    } catch (e) {
      throw e;
    }
  }

  const asyncDispatch = async (action) => {
    switch (action.type) {
      case fsActions.INIT:
        await initStateAndStorage();
        break;
      case fsActions.ADD_FILE:
        break;
      case fsActions.REMOVE_FILE:
        break;
      case fsActions.EDIT_FILE:
        break;
      case fsActions.OPEN_FILE:
        break;
      case fsActions.MOVE_FILE:
        break;
      case fsActions.ADD_FOLDER:
        await addFolder(action);
        break;
      case fsActions.REMOVE_FOLDER:
        await removeFolder(action);
        break;
      case fsActions.EDIT_FOLDER:
        break;
      case fsActions.OPEN_FOLDER:
        break;
      case fsActions.MOVE_FOLDER:
        break;
      default:
        throw new Error("ASYNC dispatch type not recognized");
    }
  };

  return [asyncDispatch];
};
