import React from "react";
import PropTypes from "prop-types";
import { Content, StyledViewPager } from "./view-pager.styles";
import FileSystemPageComponent from "../pages/file-system-page/file-system-page.component";
import BookmarksPageComponent from "../pages/bookmarks-page/bookmarks-page.component";

const ViewPagerComponent = ({
  searchQuery,
  pageNum,
  switchToBookmarksPage,
}) => {
  return (
    <Content className="Content">
      <StyledViewPager pageNum={pageNum} className="StyledViewPager">
        {/* file system page */}
        <FileSystemPageComponent
          searchQuery={searchQuery}
          switchToBookmarksPage={switchToBookmarksPage}
        />
        {/* video bookmakrks page */}
        <BookmarksPageComponent searchQuery={searchQuery} />
      </StyledViewPager>
    </Content>
  );
};
ViewPagerComponent.protoType = {
  pageNum: PropTypes.oneOf(["first", "second"]),
};
export default ViewPagerComponent;
