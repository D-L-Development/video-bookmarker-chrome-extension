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
    themeName: THEMES.LIGHT,
    primary_c: "rgb(16, 4, 54)",
    bookmarkHeader_c: "rgb(54, 51, 117)",
    bookmarkHeaderNested_c: "rgba(75, 72, 117, 0.5)",
    bookmarkBody_c: "lightblue",
    pageControls_c: "rgb(42, 42, 111)",
    pageHeader_c: "rgb(37, 49, 116)",
    controlPageHeader_c: "#2a2a6f",
    body_c: "rgb(179, 179, 179)",
    file_c: "#b64e4e",
    folder_c: "#FFEECCFF",
    scroller_c: "#8f8f8f",
    scrollerHover_c: "#676767",
    bgHoverColor: "rgba(255, 255, 255, 0.2)",
    fsItemSelected_c: "#4d4d4d40",
    fsItemHover_c: "rgba(119,119,119,0.25)",
    fsItemSelectedOutline_c: "#7d6f6f",
    inputGlow_c: "rgb(200, 200, 255)",
    inputOutline_c: "rgb(255, 200, 200)",
    error_c: "rgb(228, 62, 62)",
    selected_folder_c: "#6271f1",
    modalColors: {
      cancelBtn_c: "#abb8bd",
      submitBtn_c: "#c26e41",
      cancelBtnHover_c: "rgba(108, 108, 206, 0.724)",
      submitBtnHover_c: "#c26e41b3",
      disabledBtn_c: "rgb(190, 190, 190)",
      typeColors: {
        alert: "rgb(176, 53, 53)",
        form: "rgb(71, 102, 225)",
        warning: "rgb(182, 179, 24)",
      },
    },
  },
  [THEMES.DARK]: {
    themeName: THEMES.DARK,
    primary_c: "#000000",
    bookmarkHeader_c: "rgb(110, 73, 83)",
    bookmarkHeaderNested_c: "rgba(75, 72, 117, 0.5)",
    bookmarkBody_c: "rgb(137, 137, 137)",
    pageControls_c: "rgb(60 60 70)",
    pageHeader_c: "rgb(60 49 64)",
    controlPageHeader_c: "#2a2a6f",
    body_c: "rgb(47, 40, 40)",
    file_c: "#b64e4e",
    folder_c: "#FFEECCFF",
    scroller_c: "#8f8f8f",
    scrollerHover_c: "#676767",
    bgHoverColor: "rgba(255, 255, 255, 0.2)",
    fsItemSelected_c: "#4d4d4d40",
    fsItemHover_c: "rgba(119,119,119,0.25)",
    fsItemSelectedOutline_c: "#7d6f6f",
    inputGlow_c: "rgb(200, 200, 255)",
    inputOutline_c: "rgb(255, 200, 200)",
    error_c: "rgb(228, 62, 62)",
    selected_folder_c: "#6271f1",
    modalColors: {
      cancelBtn_c: "rgb(171, 184, 189)",
      submitBtn_c: "#9d5a34",
      cancelBtnHover_c: "rgb(136,146,150)",
      submitBtnHover_c: "#c26e41b3",
      disabledBtn_c: "rgb(190, 190, 190)",
      typeColors: {
        alert: "rgb(126,50,50)",
        form: "rgb(87 76 92)",
        warning: "rgb(162,162,124)",
      },
    },
  },
};
