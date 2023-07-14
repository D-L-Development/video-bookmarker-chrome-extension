export const THEMES = {
  // key must be equal to value
  LIGHT: "LIGHT",
  DARK: "DARK",
  CUSTOM: "CUSTOM",
};

export const getTheme = (theme) => {
  if (typeof theme === "object") {
    return theme;
  } else {
    return defaultPalettes[theme];
  }
};

export const defaultPalettes = {
  [THEMES.LIGHT]: {
    // main area
    primary_c: "#c08b8b", // top bar and footer colors
    bgHoverColor: "#fcfcfc", // buttons hover color
    body_c: "#b2b2b4",
    inputGlow_c: "#c7c7fd",
    inputOutline_c: "#fcc7c7",
    // bookmarks colors
    bookmarkBody_c: "#b0dbe9",
    bookmarkHeaderNested_c: "#4c4977",
    bookmarkHeader_c: "#38357a",
    controlPageHeader_c: "#2b2b72", // **** NOT USED ****
    // file system colors
    file_c: "#b84e4e", // **** NOT USED ****
    folder_c: "#fcebc9", // **** NOT USED ****
    fsItemHover_c: "#777776",
    fsItemSelectedOutline_c: "#817474",
    fsItemSelected_c: "#4e4e4e",

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
    bgHoverColor: "#646161",
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
    fsItemHover_c: "#777777",
    fsItemSelectedOutline_c: "#7d6f6f",
    fsItemSelected_c: "#4d4d4d40",
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
