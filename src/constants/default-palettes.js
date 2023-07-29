import { CUSTOM_THEME_KEY, THEME_TYPE_KEY } from "../contexts/theme.context";

export const THEMES = {
  // key must be equal to value
  LIGHT: "Light",
  DARK: "Dark",
  CUSTOM: "Custom",
};

export const THEME_ACTIONS = {
  CHANGE_THEME_TYPE: "CHANGE_THEME_TYPE",
  UPDATE_CUSTOM_THEME: "UPDATE_CUSTOM_THEME",
  SAVE_CACHED_THEME: "SAVE_CACHED_THEME",
};

/**
 *
 * @param type {string}
 * @param customTheme {object | null}
 * @return {object}
 */
export const getThemeObject = (type, customTheme = null) => {
  if (type === THEMES.CUSTOM) {
    return customTheme
      ? { type, ...customTheme }
      : getThemeObject(THEMES.LIGHT);
  } else return { type, ...defaultPalettes[type] };
};

/**
 *
 * @return {Promise<{customTheme: object | null, type: string}>}
 */
export const fetchTheme = async () => {
  const storage = await chrome.storage.sync.get([
    THEME_TYPE_KEY,
    CUSTOM_THEME_KEY,
  ]);
  return {
    type: storage[THEME_TYPE_KEY] || THEMES.LIGHT,
    customTheme: storage[CUSTOM_THEME_KEY],
  };
};

export const defaultPalettes = {
  [THEMES.LIGHT]: {
    // main area
    primary_c: "#0f1123", // top bar and footer colors
    body_c: "#d3d3d3",
    inputGlow_c: "#c7c7fd",
    inputOutline_c: "#fcc7c7",
    // bookmarks colors
    bookmarkBody_c: "#b0dbe9",
    bookmarkHeaderNested_c: "#4c4977",
    bookmarkHeader_c: "#3E3971",
    controlPageHeader_c: "#2b2b72", // **** NOT USED ****
    // file system colors
    file_c: "#b84e4e", // **** NOT USED ****
    folder_c: "#fcebc9", // **** NOT USED ****

    pageControls_c: "#2b2b6e", // below top bar. Where the action buttons go
    pageHeader_c: "#273377", // below pageControls area
    error_c: "#e23d3d", // **** NOT SURE WHAT FOR ****
    scrollerHover_c: "#70706e",
    scroller_c: "#949392",
    selected_folder_c: "#5d6ceb", // **** NOT USED ****
    modalColors: {
      cancelBtn_c: "#abb8bd",
      submitBtn_c: "#c26e41",
      cancelBtnHover_c: "#6C6CCE",
      submitBtnHover_c: "#c26e41b3",
      disabledBtn_c: "#BEBEBE",
      typeColors: {
        alert: "#B03535",
        form: "#4766E1",
        warning: "#B6B318",
      },
    },
  },
  [THEMES.DARK]: {
    // main area
    primary_c: "#000000",
    body_c: "#2F2828",
    inputGlow_c: "#C8C8FF",
    inputOutline_c: "#FFC8C8",
    // bookmarks colors
    bookmarkBody_c: "#898989",
    bookmarkHeaderNested_c: "#4B4875",
    bookmarkHeader_c: "#6E4953",
    controlPageHeader_c: "#2a2a6f",
    // file system colors
    file_c: "#b64e4e",
    folder_c: "#FFEECCFF",

    pageControls_c: "#3C3C46",
    pageHeader_c: "#3C3140",
    error_c: "#E43E3E",
    scroller_c: "#8f8f8f",
    scrollerHover_c: "#676767",
    selected_folder_c: "#6271f1",
    modalColors: {
      cancelBtn_c: "#ABB8BD",
      submitBtn_c: "#9d5a34",
      cancelBtnHover_c: "#889296",
      submitBtnHover_c: "#c26e41",
      disabledBtn_c: "#BEBEBE",
      typeColors: {
        alert: "#7E3232",
        form: "#574C5C",
        warning: "#A2A27C",
      },
    },
  },
};
