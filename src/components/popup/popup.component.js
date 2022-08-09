import React, { useContext, useRef, useState } from "react";
import CloseIcon from "../../icons/close-icon/close.icon";
import { MSG, sendMessageToActiveTab } from "../../contentScripts/utility";
import {
  CloseIconWrapper,
  Footer,
  Header,
  PopupIconGroup,
  SettingsIconWrapper,
  StyledPopup,
} from "./popup.styles";
import ViewPagerComponent from "./view-pager/view-pager.component";
import { OutsideContext } from "../../contexts/outside-context";
import FileSystemControlsComponent from "./pages/file-system-page/file-system-controls/file-system-controls.component";
import { PageHeader } from "./view-pager/view-pager.styles";
import PathComponent from "./shared/path/path.component";
import InputComponent from "./shared/input/input.component";
import BookmarksControlsComponent from "./pages/bookmarks-page/bookmarks-controls/bookmarks-controls.component";
import { ChangeThemeContext } from "../../contexts/theme.context";
import { THEMES } from "../../constants/default-palettes";
import { useTheme } from "styled-components";
import CogIcon from "../../icons/cog-icon/cog.icon";

export const FIRST = "first";
export const SECOND = "second";
const OPTIONS_PAGE_URL = chrome.runtime.getURL("./options.html");

const PopupComponent = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [pageInfo, setPageInfo] = useState({ current: FIRST, uuid: null });
  const containerRef = useRef(null);
  const theme = useTheme();
  // TODO: remove this stuff
  const [isDark, setIsDark] = useState(theme.themeName === THEMES.DARK);
  const changeTheme = useContext(ChangeThemeContext);
  // TODO: until here

  const handleCloseIconClick = (e) => {
    sendMessageToActiveTab({ type: MSG.TOGGLE_POPUP });
  };

  const handleCogIconClick = (e) => {
    window.open(OPTIONS_PAGE_URL, "_blank");
  };

  const renderBookmarksPage = (uuid) => {
    setSearchQuery("");
    setPageInfo({ current: SECOND, uuid });
  };

  const renderFileSystemPage = () => {
    setSearchQuery("");
    setPageInfo({ current: FIRST, uuid: null });
  };

  return (
    <StyledPopup ref={containerRef}>
      {/* Context provider to detect clicks outside of a context menu */}
      <OutsideContext.Provider value={containerRef}>
        <Header>
          {/* TODO: remove this checkbox */}
          <input
            type={"checkbox"}
            checked={isDark}
            onChange={() => {
              setIsDark(!isDark);
              changeTheme(!isDark ? THEMES.DARK : THEMES.LIGHT);
            }}
          />
          <PopupIconGroup>
            <SettingsIconWrapper
              onClick={handleCogIconClick}
              title="Open settings"
            >
              <CogIcon width={"20px"} height={"20px"} color={"white"} />
            </SettingsIconWrapper>

            <CloseIconWrapper onClick={handleCloseIconClick} title="Hide menu">
              <CloseIcon width="24px" height="24px" color="white" />
            </CloseIconWrapper>
          </PopupIconGroup>
        </Header>

        {pageInfo.current === FIRST ? (
          <FileSystemControlsComponent />
        ) : (
          <BookmarksControlsComponent />
        )}
        <PageHeader className="PageHeader">
          <PathComponent
            pageNum={pageInfo.current}
            goBackToFileSystem={renderFileSystemPage}
          />
          <InputComponent
            placeholder={`Find ${
              pageInfo.current === FIRST ? "files" : "bookmarks"
            }...`}
            setQuery={setSearchQuery}
            query={searchQuery}
          />
        </PageHeader>
        <ViewPagerComponent
          searchQuery={searchQuery}
          pageInfo={pageInfo}
          switchToBookmarksPage={renderBookmarksPage}
        />

        <Footer>Web Video Bookmarker</Footer>
      </OutsideContext.Provider>
    </StyledPopup>
  );
};

export default PopupComponent;
