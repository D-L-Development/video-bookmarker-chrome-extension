import React from "react";
import PropTypes from "prop-types";
import { Content, StyledViewPager } from "./view-pager.styles";
import FileSystemPageComponent from "../pages/file-system-page/file-system-page.component";
import BookmarksPageComponent from "../pages/bookmarks-page/bookmarks-page.component";
import { FIRST } from "../popup.component";

const ViewPagerComponent = ({
  searchQuery,
  pageInfo,
  switchToBookmarksPage,
  isGridView,
}) => {
  return (
    <Content className="Content">
      <StyledViewPager pageNum={pageInfo.current} className="StyledViewPager">
        {pageInfo.current === FIRST ? (
          <FileSystemPageComponent
            searchQuery={searchQuery}
            switchToBookmarksPage={switchToBookmarksPage}
            isGridView={isGridView}
          />
        ) : (
          <BookmarksPageComponent
            searchQuery={searchQuery}
            fileUuid={pageInfo.uuid}
          />
        )}
      </StyledViewPager>
    </Content>
  );
};
ViewPagerComponent.protoType = {
  pageNum: PropTypes.oneOf(["first", "second"]),
  isGridView: PropTypes.bool.isRequired,
};
export default ViewPagerComponent;
