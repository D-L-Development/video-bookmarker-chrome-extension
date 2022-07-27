import { fsActions } from "../reducers/file-system.reducer";
import { FS_Item } from "../classes/file.class";
import { guid } from "../contentScripts/utility";

const ROOT = "ROOT";
const rootDir = {
  folders: [],
  files: [],
  current: { uuid: ROOT, name: "Files", date: null },
  parent: null,
  isLoading: false,
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
  const asyncDispatch = async (action) => {
    switch (action.type) {
      case fsActions.INIT:
        await initStateAndStorage();
        break;
      case fsActions.ADD_FILE:
        await addFile(action);
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
        await openFolder(action);
        break;
      case fsActions.MOVE_FOLDER:
        break;
      default:
        // any action that isn't async will be passed to the async
        // dispatch function to handle.
        syncFileSystemDispatch(action);
    }
  };

  const addFolder = async ({ type, payload }) => {
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
  };

  const initStateAndStorage = async () => {
    try {
      const storage = await chrome.storage.sync.get(ROOT);
      if (chrome.runtime.lastError) {
        console.log(chrome.runtime.lastError);
      }
      // if not found, use the default value and save it to chrome.storage
      if (storage[ROOT]) {
        // the storage doesn't contain the selected key, so we add it
        storage[ROOT].files.forEach((file) => (file.selected = false));
        storage[ROOT].folders.forEach((folder) => (folder.selected = false));
        const { current, parent } = rootDir;
        syncFileSystemDispatch({
          type: fsActions.INIT,
          payload: { ...storage[ROOT], current, parent, isLoading: false },
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

  const removeFolder = async ({ type, payload }) => {
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
  };

  const addFile = async ({ type, payload }) => {
    const { current } = fileSystemState;
    try {
      const storage = await chrome.storage.sync.get(current.uuid);
      const file = new FS_Item(guid(), payload.name, payload.date);
      storage[current.uuid].files.push(file);
      storage[file.uuid] = {
        bookmarks: {},
      };
      await chrome.storage.sync.set(storage);
      file.selected = false;
      syncFileSystemDispatch({ type, payload: { file } });
    } catch (e) {
      throw e;
    }
  };

  /**
   * Fetches chrome.storage for the new folder, and updates the state of the app
   *
   * @param type
   * @param payload
   * @returns {Promise<void>}
   */
  const openFolder = async ({ type, payload }) => {
    try {
      const clickedId = payload.uuid;
      const clickedFolder = fileSystemState.folders.find(
        (folder) => folder.uuid === clickedId
      );
      const storage = await chrome.storage.sync.get(clickedId);
      if (storage[clickedId] && clickedFolder) {
        storage[clickedId].files.forEach((file) => (file.selected = false));
        storage[clickedId].folders.forEach(
          (folder) => (folder.selected = false)
        );
        // update the current and parent folders
        storage[clickedId].parent = fileSystemState.current;
        storage[clickedId].current = clickedFolder;
        storage[clickedId].isLoading = false;

        syncFileSystemDispatch({
          type,
          payload: {
            ...storage[clickedId],
          },
        });
      } else {
        throw new Error("Folder is not found!");
      }
    } catch (e) {
      throw e;
    }
  };

  return [asyncDispatch];
};
