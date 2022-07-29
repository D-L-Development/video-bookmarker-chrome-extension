import { fsActions } from "../reducers/file-system.reducer";
import { FS_Item } from "../classes/file.class";
import { guid } from "../contentScripts/utility";
import { fakeDB } from "../constants/fake-db";

const MODE = "dev";
const ROOT = "ROOT";
const rootDir = {
  folders: [],
  files: [],
  history: [{ uuid: ROOT, name: "Files", date: null }],
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
      case fsActions.EDIT_FILE:
        await editFile(action);
        break;
      case fsActions.OPEN_FILE:
        break;
      case fsActions.MOVE_FILE:
        break;
      case fsActions.ADD_FOLDER:
        await addFolder(action);
        break;
      case fsActions.EDIT_FOLDER:
        await editFolder(action);
        break;
      case fsActions.OPEN_FOLDER:
        await openFolder(action);
        break;
      case fsActions.MOVE_FOLDER:
        break;
      case fsActions.GO_BACK:
        await goBack(action);
        break;
      case fsActions.REMOVE:
        await removeItems(action);
        break;
      default:
        // any action that isn't async will be passed to the synchronous
        // dispatch function to handle.
        syncFileSystemDispatch(action);
    }
  };

  const editFile = async ({ type, payload }) => {
    try {
      const currentFolder = fileSystemState.history.at(-1);
      const storage = await chrome.storage.sync.get(currentFolder.uuid);
      if (storage[currentFolder.uuid]) {
        storage[currentFolder.uuid].files = storage[
          currentFolder.uuid
        ].files.map((file) =>
          file.uuid === payload.uuid
            ? {
                ...file,
                name: payload.name,
                date: payload.date,
              }
            : file
        );

        await chrome.storage.sync.set(storage);

        syncFileSystemDispatch({ type, payload });
      } else {
        throw new Error("Failed to find file in storage");
      }
    } catch (e) {
      throw e;
    }
  };

  const addFolder = async ({ type, payload }) => {
    const current = fileSystemState.history.at(-1);

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
        const { history, isLoading } = rootDir;
        syncFileSystemDispatch({
          type: fsActions.INIT,
          payload: { ...storage[ROOT], history, isLoading },
        });
      } else {
        // TODO: remove this. This is just for testing
        if (MODE === "dev") {
          await chrome.storage.sync.set(fakeDB);
          syncFileSystemDispatch({
            type: fsActions.INIT,
            payload: {
              ...rootDir,
              files: fakeDB[ROOT].files.map((file) => ({
                ...file,
                selected: false,
              })),
              folders: fakeDB[ROOT].folders.map((folder) => ({
                ...folder,
                selected: false,
              })),
            },
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
      }
    } catch (e) {
      throw e;
    }
  };

  const addFile = async ({ type, payload }) => {
    const current = fileSystemState.history.at(-1);
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

  const goBack = async ({ type }) => {
    try {
      const destination = fileSystemState.history.at(-2);
      const storage = await chrome.storage.sync.get(destination.uuid);

      if (storage[destination.uuid]) {
        fileSystemState.history.pop();
        const { files, folders } = storage[destination.uuid];
        files.forEach((file) => (file.selected = false));
        folders.forEach((folder) => (folder.selected = false));
        storage[destination.uuid] = {
          ...fileSystemState,
          files,
          folders,
        };

        syncFileSystemDispatch({
          type,
          payload: storage[destination.uuid],
        });
      } else {
        throw new Error("Id not found in storage");
      }
    } catch (e) {
      throw e;
    }
  };

  const editFolder = async ({ type, payload }) => {
    try {
      const currentFolder = fileSystemState.history.at(-1);
      const storage = await chrome.storage.sync.get(currentFolder.uuid);
      if (storage[currentFolder.uuid]) {
        storage[currentFolder.uuid].folders = storage[
          currentFolder.uuid
        ].folders.map((folder) =>
          folder.uuid === payload.uuid
            ? {
                ...folder,
                name: payload.name,
              }
            : folder
        );

        await chrome.storage.sync.set(storage);

        syncFileSystemDispatch({ type, payload });
      } else {
        throw new Error("Failed to find folder in storage");
      }
    } catch (e) {
      throw e;
    }
  };

  const removeItems = async (action) => {
    try {
      const currFolderId = fileSystemState.history.at(-1).uuid;
      const { fileIds, folderIds } = action.payload;

      const storage = await chrome.storage.sync.get(currFolderId);

      if (storage[currFolderId]) {
        const promiseList = [];
        // Remove the folders and files from storage
        storage[currFolderId].folders = storage[currFolderId].folders.filter(
          (folder) => {
            if (folderIds.hasOwnProperty(folder.uuid)) {
              deapRemoveFolder(folder.uuid, promiseList);
              return false;
            }
            return true;
          }
        );
        storage[currFolderId].files = storage[currFolderId].files.filter(
          (file) => {
            if (fileIds.hasOwnProperty(file.uuid)) {
              promiseList.push(chrome.storage.sync.remove(file.uuid));
              return false;
            }
            return true;
          }
        );
        // Remove the folder and files from parent key
        promiseList.push(chrome.storage.sync.set(storage));

        await Promise.all(promiseList);

        syncFileSystemDispatch({
          type: fsActions.SET_STATE,
          payload: {
            ...fileSystemState,
            files: storage[currFolderId].files.map((file) => ({
              ...file,
              selected: false,
            })),
            folders: storage[currFolderId].folders.map((folder) => ({
              ...folder,
              selected: false,
            })),
          },
        });
      } else {
        throw new Error("Failed to find folder");
      }
    } catch (e) {
      throw e;
    }
  };

  const deapRemoveFolder = async (uuid, promiseList) => {
    const removeFolder = async (uuid) => {
      const storage = await chrome.storage.sync.get(uuid);
      if (storage[uuid]) {
        const { files, folders } = storage[uuid];
        // remove all directly nested files from storage
        files.forEach((file) =>
          promiseList.push(chrome.storage.sync.remove(file.uuid))
        );
        // remove the key for the folder itself
        promiseList.push(chrome.storage.sync.remove(uuid));
        // if no more folders are nested, then exist the function
        if (folders.length === 0) return;
        // remove any nested folders recursively
        folders.forEach((folder) =>
          promiseList.push(removeFolder(folder.uuid))
        );
      }
    };

    promiseList.push(removeFolder(uuid));
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
        // update the file history
        storage[clickedId].history = fileSystemState.history;
        storage[clickedId].history.push(clickedFolder);
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
