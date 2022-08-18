import React, { useRef, useState } from "react";
import CloseIcon from "../../icons/close-icon/close.icon";
import { MSG, sendMessageToActiveTab } from "../../contentScripts/utility";
import {
  CloseIconWrapper,
  Footer,
  Header,
  HeaderText,
  MainHeaderIconWrapper,
  PopupIconGroup,
  StyledPopup,
} from "./popup.styles";
import ViewPagerComponent from "./view-pager/view-pager.component";
import { OutsideContext } from "../../contexts/outside-context";
import FileSystemControlsComponent from "./pages/file-system-page/file-system-controls/file-system-controls.component";
import { PageHeader } from "./view-pager/view-pager.styles";
import PathComponent from "./shared/path/path.component";
import InputComponent from "./shared/input/input.component";
import BookmarksControlsComponent from "./pages/bookmarks-page/bookmarks-controls/bookmarks-controls.component";
import CogIcon from "../../icons/cog-icon/cog.icon";
import { VideoProvider } from "../../contexts/video.context";
import MinusIcon from "../../icons/bookmarks-icons/minus-icon/minus.icon";

export const FIRST = "first";
export const SECOND = "second";
const OPTIONS_PAGE_URL = chrome.runtime.getURL("./options.html");

const PopupComponent = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [pageInfo, setPageInfo] = useState({ current: FIRST, uuid: null });
  const containerRef = useRef(null);

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
          <HeaderText>Web Video Bookmarker</HeaderText>
          <PopupIconGroup>
            <MainHeaderIconWrapper
              onClick={() => {
                sendMessageToActiveTab({ type: MSG.TOGGLE_DRAG });
              }}
            >
              <MinusIcon width={"20px"} height={"20px"} color={"white"} />
            </MainHeaderIconWrapper>
            <MainHeaderIconWrapper
              onClick={handleCogIconClick}
              title="Open settings"
            >
              <CogIcon width={"20px"} height={"20px"} color={"white"} />
            </MainHeaderIconWrapper>

            <CloseIconWrapper onClick={handleCloseIconClick} title="Hide menu">
              <CloseIcon width="24px" height="24px" color="white" />
            </CloseIconWrapper>
          </PopupIconGroup>
        </Header>

        {pageInfo.current === FIRST ? (
          <FileSystemControlsComponent />
        ) : (
          <VideoProvider>
            <BookmarksControlsComponent />
          </VideoProvider>
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

        <Footer></Footer>
      </OutsideContext.Provider>
    </StyledPopup>
  );
};

export default PopupComponent;
