import React from "react";
import PropTypes from "prop-types";
import { Content, StyledViewPager } from "./view-pager.styles";

import { StyledPage } from "../pages/page.styles";
import FileSystemPageComponent from "../pages/file-system-page/file-system-page.component";
import BookmarksPageComponent from "../pages/bookmarks-page/bookmarks-page.component";

const ViewPagerComponent = (props) => {
  return (
    <Content className="Content">
      <StyledViewPager pageNum={props.pageNum} className="StyledViewPager">
        {/* file system page */}
        <FileSystemPageComponent />
        {/* video bookmakrks page */}
        <BookmarksPageComponent />
      </StyledViewPager>
    </Content>
  );
};
ViewPagerComponent.protoType = {
  pageNum: PropTypes.oneOf(["first", "second"]),
};
export default ViewPagerComponent;
