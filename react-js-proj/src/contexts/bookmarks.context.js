import React, { createContext, useEffect, useRef, useState } from "react";
import {
  checkChromeLastError,
  filterObj,
  mapObj,
} from "../contentScripts/utility";

export const BookmarksContext = createContext(null);
export const BookmarksDispatchContext = createContext(null);

export const bookmarksActions = {
  ADD: "add",
  DELETE: "delete",
  EDIT: "edit",
  TOGGLE_NEST: "toggle nest",
  INIT: "init",
};

export const BookmarksContextProvider = ({ children }) => {
  const [state, setState] = useState({ isLoading: true, bookmarks: {} });
  const fileIdRef = useRef({ uuid: null });

  useEffect(() => {
    console.log("RERENDER", state);
  });

  /**
   * Updates chrome.storage, then calls the reducer to change the state
   *
   * @param action
   * @returns {Promise<void>}
   */
  const bookmarksDispatch = async ({ type, payload }) => {
    try {
      let newState = {};
      switch (type) {
        case bookmarksActions.INIT:
          // keep reference to storage key
          fileIdRef.current.uuid = payload.uuid;
          const storage = await chrome.storage.sync.get(payload.uuid);
          checkChromeLastError();
          if (storage[payload.uuid]) {
            setState({
              bookmarks: storage[payload.uuid].bookmarks,
              isLoading: false,
            });
          } else {
            setState({ ...state, isLoading: false });
            throw new Error("Something went wrong opening file");
          }
          break;
        case bookmarksActions.ADD:
          newState = {
            ...state,
            bookmarks: {
              ...state.bookmarks,
              [payload.timestamp]: { ...payload.bookmark },
            },
          };
          await updateStorageThenState(newState);
          break;
        case bookmarksActions.DELETE:
          newState = {
            ...state,
            bookmarks: filterObj(
              state.bookmarks,
              (key, val) => key !== payload.timestamp
            ),
          };
          await updateStorageThenState(newState);
          break;
        case bookmarksActions.EDIT:
          const { title, text, isNested, timestamp } = payload;
          newState = {
            ...state,
            bookmarks: mapObj(state.bookmarks, (value, key) =>
              timestamp === key
                ? {
                    ...state.bookmarks[key],
                    title,
                    text,
                    isNested,
                  }
                : state.bookmarks[key]
            ),
          };
          await updateStorageThenState(newState);
          break;
        case bookmarksActions.TOGGLE_NEST:
          newState = {
            ...state,
            bookmarks: mapObj(state.bookmarks, (value, key) =>
              payload.timestamp === key
                ? {
                    ...state.bookmarks[key],
                    isNested: !state.bookmarks[key].isNested,
                  }
                : state.bookmarks[key]
            ),
          };
          await updateStorageThenState(newState);
          break;
        default:
          throw new Error("Dispatched bookmarks action is unknown");
      }
    } catch (e) {
      throw e;
    }
  };

  const updateStorageThenState = async (newState) => {
    await chrome.storage.sync.set({ [fileIdRef.current.uuid]: newState });
    checkChromeLastError();
    setState(newState);
  };

  return (
    <BookmarksContext.Provider value={state}>
      <BookmarksDispatchContext.Provider value={bookmarksDispatch}>
        {children}
      </BookmarksDispatchContext.Provider>
    </BookmarksContext.Provider>
  );
};
