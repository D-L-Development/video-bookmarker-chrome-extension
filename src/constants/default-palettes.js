export const THEMES = {
  LIGHT: "light",
  DARK: "dark",
};

export const defaultPalettes = {
  [THEMES.LIGHT]: {
    controlPageHeader_c: "#2a2a6f",
    body_c: "#b3b3b3",
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
  [THEMES.DARK]: {},
};
