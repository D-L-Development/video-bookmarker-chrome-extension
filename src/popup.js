import React from "react";
import { createRoot } from "react-dom/client";
import PopupComponent from "./components/popup/popup.component";
import { ModalProvider } from "./contexts/modal.context";
import { FileSystemProvider } from "./contexts/file-system.context";
import { BookmarksContextProvider } from "./contexts/bookmarks.context";
import { SettingsProvider } from "./contexts/settings.context";
import { CustomThemeProvider } from "./contexts/theme.context";
import { VideoProvider } from "./contexts/video.context";

const container = document.getElementById("react-popup-root");
const root = createRoot(container);
root.render(
  <CustomThemeProvider>
    <SettingsProvider>
      <FileSystemProvider>
        <BookmarksContextProvider>
          <ModalProvider>
            <VideoProvider>
              <PopupComponent tab="home" />
            </VideoProvider>
          </ModalProvider>
        </BookmarksContextProvider>
      </FileSystemProvider>
    </SettingsProvider>
  </CustomThemeProvider>
);
