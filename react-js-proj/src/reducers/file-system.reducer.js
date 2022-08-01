// const rootDir = {
//   folders: [{uuid: ROOT, name: "Root Folder", date: null}],
//   files: [{uuid: ROOT, name: "Root Folder", date: null}],
//   current: { uuid: ROOT, name: "Root Folder", date: null },
//   parent: null,
// };

export const fsActions = {
  INIT: "initialize",
  ADD_FILE: "add file",
  EDIT_FILE: "edit file",
  ADD_FOLDER: "add folder",
  EDIT_FOLDER: "edit folder",
  OPEN_FILE: "open file",
  OPEN_FOLDER: "open folder",
  DESELECT_ALL: "deselect all",
  TOGGLE_SELECTION: "toggle selection",
  TOGGLE_SELECTION_RANGE: "toggle selection range",
  SELECT_ALL: "select all",
  GO_BACK: "go back",
  REMOVE: "remove",
  SET_STATE: "set state",
  MOVE: "move folders and files",
};
const FileSystemReducer = (state, action) => {
  switch (action.type) {
    case fsActions.INIT:
      return action.payload;
    case fsActions.ADD_FILE:
      return { ...state, files: [...state.files, action.payload.file] };
    case fsActions.EDIT_FILE:
      return {
        ...state,
        files: state.files.map((file) =>
          file.uuid === action.payload.uuid ? { ...action.payload } : file
        ),
      };
    case fsActions.OPEN_FILE:
      return state;
    case fsActions.ADD_FOLDER:
      return {
        ...state,
        folders: [...state.folders, action.payload.folder],
      };
    case fsActions.EDIT_FOLDER:
      const { uuid, name } = action.payload;
      return {
        ...state,
        folders: state.folders.map((currFolder) =>
          currFolder.uuid === uuid ? { ...currFolder, name } : currFolder
        ),
      };
    case fsActions.MOVE:
      return {
        ...state,
        files: action.payload.files,
        folders: action.payload.folders,
      };
    case fsActions.OPEN_FOLDER:
      return action.payload;
    case fsActions.DESELECT_ALL:
      const toBeSelectedId = action.payload?.uuid;

      return {
        ...state,
        files: state.files.map((file) => ({
          ...file,
          selected: toBeSelectedId && toBeSelectedId === file.uuid,
        })),
        folders: state.folders.map((folder) => ({
          ...folder,
          selected: Boolean(toBeSelectedId && toBeSelectedId === folder.uuid),
        })),
      };
    case fsActions.TOGGLE_SELECTION:
      return {
        ...state,
        folders: state.folders.map((folder) =>
          folder.uuid === action.payload.uuid
            ? {
                ...folder,
                selected: !folder.selected,
              }
            : folder
        ),
        files: state.files.map((file) =>
          file.uuid === action.payload.uuid
            ? {
                ...file,
                selected: !file.selected,
              }
            : file
        ),
      };
    case fsActions.TOGGLE_SELECTION_RANGE:
      let reachedOutOfRange = false;
      let inRange = false;
      const { firstId, secondId } = action.payload;
      return {
        ...state,
        folders: state.folders.map((folder) => {
          if (reachedOutOfRange) {
            inRange = false;
          } else if (folder.uuid === firstId) {
            inRange = true;
          } else if (folder.uuid === secondId) {
            reachedOutOfRange = true;
          }

          return {
            ...folder,
            selected: inRange,
          };
        }),
        files: state.files.map((file) => {
          if (reachedOutOfRange) {
            inRange = false;
          } else if (file.uuid === firstId) {
            inRange = true;
          } else if (file.uuid === secondId) {
            reachedOutOfRange = true;
          }

          return {
            ...file,
            selected: inRange,
          };
        }),
      };
    case fsActions.SELECT_ALL:
      return {
        ...state,
        files: state.files.map((file) => ({ ...file, selected: true })),
        folders: state.folders.map((folder) => ({ ...folder, selected: true })),
      };
    case fsActions.GO_BACK:
      return action.payload;
    case fsActions.REMOVE:
      const { fileIds, folderIds } = action.payload;
      return {
        ...state,
        folders: state.folders.filter((folder) => folderIds[folder.uuid]),
        files: state.files.filter((file) => fileIds[file.uuid]),
      };
    case fsActions.SET_STATE:
      return action.payload;
    default:
      throw new Error("SYNC dispatch type not recognized");
      return state;
  }
};

export default FileSystemReducer;
