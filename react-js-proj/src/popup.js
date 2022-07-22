import React from "react";
import { createRoot } from "react-dom/client";
import PopupComponent from "./components/popup/popup.component";
import { ModalProvider } from "./contexts/modal-context";

const container = document.getElementById("react-popup-root");
const root = createRoot(container);
root.render(
  <ModalProvider>
    <PopupComponent tab="home" />
  </ModalProvider>
);
