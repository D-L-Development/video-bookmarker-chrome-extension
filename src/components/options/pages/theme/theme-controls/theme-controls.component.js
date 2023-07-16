import React, { useContext } from "react";
import { ChangeThemePageContext } from "../../../context/theme-page-context";
import {
  THEME_ACTIONS,
  THEMES,
} from "../../../../../constants/default-palettes";
import ButtonGroupComponent from "../button-group/button-group.component";
import { useTheme } from "styled-components";

const ThemeControlsComponent = () => {
  // const [state, setState] = useState({
  //   isLoading: true,
  //   isDarkTheme: false,
  //   isCustomTheme: false,
  // });
  const dispatchTheme = useContext(ChangeThemePageContext);
  const theme = useTheme();

  // useEffect(() => {
  //   if (state.theme === THEMES.CUSTOM || state.isLoading) return;
  //   dispatchTheme({
  //     type: THEME_ACTIONS.CHANGE,
  //     payload: state.isDarkTheme ? THEMES.DARK : THEMES.LIGHT,
  //   });
  // }, [state.theme]);

  const handleThemeOptionChange = (option) => {};

  // const handleDarkModeToggle = async (e) => {
  //   try {
  //     const { checked } = e.target;
  //     // update the theme in the context
  //     await dispatchTheme({
  //       type: THEME_ACTIONS.CHANGE,
  //       payload: checked ? THEMES.DARK : THEMES.LIGHT,
  //     });
  //     // update the toggle switch state
  //     setState({ ...state, isDarkTheme: checked });
  //   } catch (e) {
  //     throw e;
  //   }
  // };

  // const handleCustomThemeToggle = async (e) => {
  //   try {
  //     // update the toggle switch
  //     // TODO: update the state here to whatever the "default" custom theme is
  //     setState({ ...state, isCustomTheme: e.target.checked });
  //   } catch (e) {
  //     throw e;
  //   }
  // };

  return (
    <>
      <ButtonGroupComponent
        buttons={Object.values(THEMES)}
        handleClick={(type) =>
          dispatchTheme({
            type: THEME_ACTIONS.CHANGE_THEME_TYPE,
            payload: { type },
          })
        }
        activeBtn={theme.type}
      />
      {/*<div style={{ display: "flex", gap: "1rem" }}>*/}
      {/*  <span*/}
      {/*    style={{ color: `${state.isCustomTheme ? "grey" : "black"}` }}*/}
      {/*  >*/}
      {/*    Dark mode:*/}
      {/*  </span>*/}
      {/*  <SwitchComponent*/}
      {/*    handleToggle={handleDarkModeToggle}*/}
      {/*    checked={state.isDarkTheme}*/}
      {/*    disabled={state.isCustomTheme}*/}
      {/*  />*/}
      {/*</div>*/}
      {/*<div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>*/}
      {/*  <span>Custom theme:</span>*/}
      {/*  <SwitchComponent*/}
      {/*    handleToggle={handleCustomThemeToggle}*/}
      {/*    checked={state.isCustomTheme}*/}
      {/*  />*/}
      {/*</div>*/}
    </>
  );
};

export default ThemeControlsComponent;
