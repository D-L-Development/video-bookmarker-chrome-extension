import React, { useState } from "react";
import PropTypes from "prop-types";
import { Content, StyledViewPager } from "./view-pager.styles";
import FileSystemPageComponent from "../pages/file-system-page/file-system-page.component";
import BookmarksPageComponent from "../pages/bookmarks-page/bookmarks-page.component";

const ViewPagerComponent = (props) => {
  const [pageNum, setPageNum] = useState("first");
  return (
    <Content className="Content">
      <StyledViewPager pageNum={pageNum} className="StyledViewPager">
        {/* file system page */}
        <FileSystemPageComponent />
        {/* video bookmakrks page */}
        <BookmarksPageComponent />
        {/* TODO: remove this button */}
        <button
          onClick={() => setPageNum(pageNum === "first" ? "second" : "first")}
          style={{
            position: "absolute",
            top: 0,
            left: pageNum === "first" ? 0 : "50%",
            zIndex: 5,
          }}
        >
          Toggle
        </button>
      </StyledViewPager>
    </Content>
  );
};
ViewPagerComponent.protoType = {
  pageNum: PropTypes.oneOf(["first", "second"]),
};
export default ViewPagerComponent;
