import React from "react";
import { createRoot } from "react-dom/client";
import PopupComponent from "./components/popup/popup.component";
import { fakeDB } from "./constants/fake-db";
import { ModalProvider } from "./contexts/modal-context";

// TODO: remove this (just for testing)
document.addEventListener("keydown", (e) => {
  if (e.key === "r" && e.ctrlKey) {
    chrome.storage.sync.clear(() => {
      console.log("CLEARED");
      chrome.storage.sync.set(fakeDB, () => {
        console.log("Data set!");
      });
    });
  }
});

const container = document.getElementById("react-popup-root");
const root = createRoot(container);
root.render(
  <ModalProvider>
    <PopupComponent tab="home" />
  </ModalProvider>
);
