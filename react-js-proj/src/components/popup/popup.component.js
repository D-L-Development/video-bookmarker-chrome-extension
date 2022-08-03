import React, { useRef, useState } from "react";
import CloseIcon from "../../icons/close-icon/close.icon";
import { MSG, sendMessageToActiveTab } from "../../contentScripts/utility";
import {
  CloseIconWrapper,
  Footer,
  Header,
  StyledMainHeader,
  StyledPopup,
} from "./popup.styles";
import ViewPagerComponent from "./view-pager/view-pager.component";
import { OutsideContext } from "../../contexts/outside-context";
import FileSystemControlsComponent from "./pages/file-system-page/file-system-controls/file-system-controls.component";
import { PageHeader } from "./view-pager/view-pager.styles";
import PathComponent from "./shared/path/path.component";
import InputComponent from "./shared/input/input.component";
import BookmarksControlsComponent from "./pages/bookmarks-page/bookmarks-controls/bookmarks-controls.component";

export const FIRST = "first";
export const SECOND = "second";

const PopupComponent = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [pageInfo, setPageInfo] = useState({ current: FIRST, uuid: null });
  const containerRef = useRef(null);

  const handleCloseIconClick = (e) => {
    sendMessageToActiveTab({ type: MSG.TOGGLE_POPUP }, (response) => {
      if (response.status !== MSG.SUCCESS) {
        alert("Failed to close side menu");
      }
    });
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
          <StyledMainHeader></StyledMainHeader>
          <CloseIconWrapper onClick={handleCloseIconClick}>
            <CloseIcon width="24px" height="24px" color="white" />
          </CloseIconWrapper>
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
            placeholder={`Search ${
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

        {/*  TODO: remove this. Just for testing */}
        <div style={{ position: "absolute", bottom: "50%", left: "50%" }}>
          <button
            onClick={() => {
              sendMessageToActiveTab({ type: MSG.PLAY }, (res) =>
                console.log(res.status)
              );
            }}
          >
            PLAY
          </button>
          <button
            onClick={() => {
              sendMessageToActiveTab({ type: MSG.PAUSE }, (res) =>
                console.log(res.status)
              );
            }}
          >
            PAUSE
          </button>
          <button
            onClick={() => {
              sendMessageToActiveTab(
                { type: MSG.GET_CURRENT_TIMESTAMP },
                (res) => console.log(res.status)
              );
            }}
          >
            GET TIMESTAMP
          </button>
          <button
            onClick={() => {
              sendMessageToActiveTab(
                {
                  type: MSG.JUMP_TO_TIMESTAMP,
                  payload: { timestamp: "00:00:05" },
                },
                (res) => console.log(res.status)
              );
            }}
          >
            JUMP TO TIMESTAMP
          </button>
        </div>
      </OutsideContext.Provider>
    </StyledPopup>
  );
};

export default PopupComponent;
