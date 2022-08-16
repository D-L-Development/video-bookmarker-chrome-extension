import React from "react";
import { createRoot } from "react-dom/client";
import OptionsComponent from "./components/options/options.component";
import {ThemePageContextProvider} from "./components/options/context/theme-page-context";

const container = document.getElementById("react-options-root");
const root = createRoot(container);
root.render(<ThemePageContextProvider><OptionsComponent tab="options" /></ThemePageContextProvider>);
