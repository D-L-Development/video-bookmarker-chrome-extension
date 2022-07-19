import React from "react";
import PropTypes from "prop-types";
import { StyledPage } from "../page.styles";
import { PageHeader } from "../../view-pager/view-pager.styles";
import * as Styled from "./bookmarks-page.styles";
import BookmarkComponent from "./bookmark/bookmark.component";
import InputComponent from "../../shared/input/input.component";

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
        <InputComponent placeholder="Search bookmarks" />
      </PageHeader>
      <Styled.BookmarksPageContent className="FileSystemContent">
        {getFakeData()}
      </Styled.BookmarksPageContent>
    </StyledPage>
  );
};

export default BookmarksPageComponent;
