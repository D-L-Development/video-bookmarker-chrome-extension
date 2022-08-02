import React, { useContext, useEffect } from "react";
import { StyledPage } from "../page.styles";
import * as Styled from "./bookmarks-page.styles";
import BookmarkComponent from "./bookmark/bookmark.component";
import {
  bookmarksActions,
  BookmarksContext,
  BookmarksDispatchContext,
} from "../../../../contexts/bookmarks.context";

const fakeBookmarks = {
  "45:21:10": {
    isNested: true,
    text: "lorem ipsum",
    title: "new title",
  },
  "34:12:10": {
    isNested: true,
    text: "lorem ipsum",
    title: "new title",
  },
};

const BookmarksPageComponent = ({ searchQuery, fileUuid }) => {
  const { bookmarks, isLoading } = useContext(BookmarksContext);
  const dispatch = useContext(BookmarksDispatchContext);
  useEffect(() => {
    console.log("BookmarksPageComponent render", fileUuid);
    dispatch({ type: bookmarksActions.INIT, payload: { uuid: fileUuid } });
  }, []);

  const renderBookmarks = () => {
    if (isLoading) {
      return null;
    } else {
      const data = [];
      for (let key in bookmarks) {
        const { isNested, title, text } = bookmarks[key];
        data.push(
          <BookmarkComponent
            key={key}
            isNested={isNested}
            text={text}
            title={title}
            timestamp={key}
          />
        );
      }
      return data;
    }
  };
  return (
    <StyledPage className="StyledPage" style={{ marginLeft: "auto" }}>
      <Styled.BookmarksPageContent className="FileSystemContent">
        {renderBookmarks()}
      </Styled.BookmarksPageContent>
    </StyledPage>
  );
};

export default BookmarksPageComponent;
