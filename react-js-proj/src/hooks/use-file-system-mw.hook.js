import { fsActions } from "../reducers/file-system.reducer";

/**
 * Since react useReducer doesn't support async operations, this function
 * acts as a middleware to handle all async storage operations, and then
 * calls the sync dispatch when all async operations are done.
 *
 * @param syncFileSystemDispatch - function to dispatch actions to local state
 * @returns {function} - returns the async dispatch function to be used
 *                       by react components through the context
 */
export const useFileSystemMW = (syncFileSystemDispatch) => {
  const asyncDispatch = async (action) => {
    switch (action.type) {
      case fsActions.INIT:
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
        break;
      case fsActions.REMOVE_FOLDER:
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
