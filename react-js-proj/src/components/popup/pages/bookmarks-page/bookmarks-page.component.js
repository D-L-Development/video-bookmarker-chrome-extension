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

  const shouldShow = (title, text) => {
    return (
      title.toLowerCase().indexOf(searchQuery.toLowerCase()) !== -1 ||
      text.toLowerCase().indexOf(searchQuery.toLowerCase()) !== -1
    );
  };

  const renderBookmarks = () => {
    if (isLoading) {
      return null;
    } else {
      const data = [];
      for (let key in bookmarks) {
        const { isNested, title, text } = bookmarks[key];
        shouldShow(title, text) &&
          data.push(
            <BookmarkComponent
              key={key}
              isNested={isNested}
              text={text}
              title={title}
              timestamp={key}
              searchQuery={searchQuery}
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
