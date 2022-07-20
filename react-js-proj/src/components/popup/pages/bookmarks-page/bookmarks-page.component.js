import React from "react";
import { StyledPage } from "../page.styles";
import { PageHeader } from "../../view-pager/view-pager.styles";
import * as Styled from "./bookmarks-page.styles";
import { AddBookmarkButton, CopyTableButton } from "./bookmarks-page.styles";
import BookmarkComponent from "./bookmark/bookmark.component";
import InputComponent from "../../shared/input/input.component";
import AddBookmarkIcon from "../../../../icons/add-bookmark-icon/add-bookmark.icon";
import CopyIcon from "../../../../icons/copy-icon/copy.icon";

// TODO: remove this
const getFakeData = () => {
  const data = [];
  for (let i = 0; i < 20; i++) {
    data.push(
      <BookmarkComponent
        key={i}
        text="lorem lorem lorem"
        title="bookmark"
        isNested={i % 2 === 0}
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
        <AddBookmarkButton>
          <AddBookmarkIcon height={"15px"} width={"15px"} color={"white"} />
          Add Bookmark
        </AddBookmarkButton>
        <CopyTableButton>
          <CopyIcon height={"15px"} width={"15px"} color={"white"} />
          Copy Table
        </CopyTableButton>
        <InputComponent
          placeholder="Search bookmarks"
          marginLeft={"auto"}
          marginRight={"0.5rem"}
        />
      </PageHeader>
      <Styled.BookmarksPageContent className="FileSystemContent">
        {getFakeData()}
      </Styled.BookmarksPageContent>
    </StyledPage>
  );
};

export default BookmarksPageComponent;
