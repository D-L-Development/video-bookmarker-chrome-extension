import React from "react";
import { createRoot } from "react-dom/client";
import OptionsComponent from "./components/options/options.component";
import {ThemeProvider} from "styled-components";
import {defaultPalettes, THEMES} from "./constants/default-palettes";

const container = document.getElementById("react-options-root");
const root = createRoot(container);
root.render(<ThemeProvider theme={defaultPalettes[THEMES.LIGHT]}><OptionsComponent tab="options" /></ThemeProvider>);
