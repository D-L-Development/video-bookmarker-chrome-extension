import React from "react";
import { createRoot } from "react-dom/client";
import PopupComponent from "./components/popup/popup.component";

const container = document.getElementById("react-popup-root");
const root = createRoot(container);
root.render(<PopupComponent tab="home" />);
