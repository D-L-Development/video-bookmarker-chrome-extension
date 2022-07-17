import React from "react";
import PropTypes from "prop-types";
import { StyledPage } from "../page.styles";
import SearchIcon from "../../../../icons/search-icon/search.icon";
import ClearIcon from "../../../../icons/clear-icon/clear.icon";
import { PageHeader } from "../../view-pager/view-pager.styles";
import {
  SearchBoxWrapper,
  SearchBox,
  ClearIconWrapper,
  SearchIconWrapper,
} from "../file-system-page/file-system-page.styles";
import * as Styled from "./bookmarks-page.styles";
import BookmarkComponent from "./bookmark/bookmark.component";

// TODO: remove this
const getFakeData = () => {
  const data = [];
  for (let i = 0; i < 12; i++) {
    data.push(
      <BookmarkComponent
        key={i}
        text="lorem lorem lorem"
        title="bookmark"
        isNested={false}
        timestamp="33:54:12"
      />
    );
  }

  return data;
};

const BookmarksPageComponent = (props) => {
  return (
    <StyledPage className="StyledPage">
      <PageHeader className="PageHeader">
        <SearchBoxWrapper className="SearchBoxWrapper">
          <SearchBox placeholder="Search sessions" />
          <SearchIconWrapper>
            <SearchIcon width="15px" height="15px" color="#9BA0A5" />
          </SearchIconWrapper>
          <ClearIconWrapper>
            <ClearIcon width="15px" height="15px" color="white" />
          </ClearIconWrapper>
        </SearchBoxWrapper>
      </PageHeader>
      <Styled.BookmarksPageContent className="FileSystemContent">
        {getFakeData()}
      </Styled.BookmarksPageContent>
    </StyledPage>
  );
};

export default BookmarksPageComponent;
