// const rootDir = {
//   folders: [{uuid: ROOT, name: "Root Folder", date: null}],
//   files: [{uuid: ROOT, name: "Root Folder", date: null}],
//   current: { uuid: ROOT, name: "Root Folder", date: null },
//   parent: null,
// };

export const fsActions = {
  INIT: "initialize",
  ADD_FILE: "add file",
  // step | make sure you create a key in storage with empty arrays
  REMOVE_FILE: "remove file",
  EDIT_FILE: "edit file",
  ADD_FOLDER: "add folder",
  // step | make sure you create a key in storage with empty arrays
  EDIT_FOLDER: "edit folder",
  REMOVE_FOLDER: "remove folder",
  // TODO: those don't work yet
  MOVE_FILE: "move file",
  // step | receive an id for the moved file, and an id for the destination
  // step | search for the id in context state and copy the file info
  // step | search in storage for the destination and append the file to its array
  // step | call dispatch(MOVE_FILE)to remove file from state - state should update on its own
  MOVE_FOLDER: "move folder",
  // step | similar to above
  OPEN_FILE: "open file",
  // step | receive the id for the file to be opened
  // step | look for the id in the state
  // step | look for the id in chrome.storage
  // step | create a new state with: previous = current; current = theOneFromTheState; update files[] and folders[] from storage
  OPEN_FOLDER: "open folder",
  // step | similar to above
  DESELECT_ALL: "deselect all",
  TOGGLE_SELECTION: "toggle selection",
  TOGGLE_SELECTION_RANGE: "toggle selection range",
  SELECT_ALL: "select all",
  GO_BACK: "go back",
};
const FileSystemReducer = (state, action) => {
  switch (action.type) {
    case fsActions.INIT:
      return action.payload;
    case fsActions.ADD_FILE:
      return { ...state, files: [...state.files, action.payload.file] };
    case fsActions.REMOVE_FILE:
      return {
        ...state,
        files: state.files.filter((file) => file.uuid !== action.payload.uuid),
      };
    case fsActions.EDIT_FILE:
      const { file } = action.payload;
      return {
        ...state,
        files: state.files.map((file) =>
          file.uuid === file.uuid ? file : file
        ),
      };
    case fsActions.MOVE_FILE:
      // TODO: implement move file
      return state;
    case fsActions.OPEN_FILE:
      return state;
    case fsActions.ADD_FOLDER:
      return {
        ...state,
        folders: [...state.folders, action.payload.folder],
      };
    case fsActions.REMOVE_FOLDER:
      return {
        ...state,
        folders: state.folders.filter(
          (folder) => folder.uuid !== action.payload.uuid
        ),
      };
    case fsActions.EDIT_FOLDER:
      const { uuid, name } = action.payload;
      return {
        ...state,
        folders: state.folders.map((currFolder) =>
          currFolder.uuid === uuid ? { ...currFolder, name } : currFolder
        ),
      };
    case fsActions.MOVE_FOLDER:
      return state;
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
    default:
      throw new Error("SYNC dispatch type not recognized");
      return state;
  }
};

export default FileSystemReducer;
