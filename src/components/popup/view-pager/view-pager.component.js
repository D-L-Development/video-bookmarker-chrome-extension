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
}) => {
  return (
    <Content className="Content">
      <StyledViewPager pageNum={pageInfo.current} className="StyledViewPager">
        {pageInfo.current === FIRST ? (
          <FileSystemPageComponent
            searchQuery={searchQuery}
            switchToBookmarksPage={switchToBookmarksPage}
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
};
export default ViewPagerComponent;
