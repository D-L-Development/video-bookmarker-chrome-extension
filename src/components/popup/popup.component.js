import React, { useRef, useState } from "react";
import { StyledPopup } from "./popup.styles";
import ViewPagerComponent from "./view-pager/view-pager.component";
import { OutsideContext } from "../../contexts/outside-context";
import FileSystemControlsComponent from "./pages/file-system-page/file-system-controls/file-system-controls.component";
import { PageHeader } from "./view-pager/view-pager.styles";
import PathComponent from "./shared/path/path.component";
import SearchBoxComponent from "./shared/search-box/search-box.component";
import BookmarksControlsComponent from "./pages/bookmarks-page/bookmarks-controls/bookmarks-controls.component";
import { VideoProvider } from "../../contexts/video.context";

export const FIRST = "first";
export const SECOND = "second";

const PopupComponent = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [pageInfo, setPageInfo] = useState({ current: FIRST, uuid: null });
  const containerRef = useRef(null);

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
          <SearchBoxComponent
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
      </OutsideContext.Provider>
    </StyledPopup>
  );
};

export default PopupComponent;
