import React, { useContext, useEffect } from "react";
import { NoItemsSign, StyledPage } from "../page.styles";
import * as Styled from "./bookmarks-page.styles";
import BookmarkComponent from "./bookmark/bookmark.component";
import {
  bookmarksActions,
  BookmarksContext,
  BookmarksDispatchContext,
} from "../../../../contexts/bookmarks.context";

const BookmarksPageComponent = ({ searchQuery, fileUuid }) => {
  const { bookmarks, isLoading } = useContext(BookmarksContext);
  const dispatch = useContext(BookmarksDispatchContext);
  useEffect(() => {
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
      const bookmarkComponents = [];
      for (let key in bookmarks) {
        const { isNested, title, text } = bookmarks[key];
        shouldShow(title, text) &&
          bookmarkComponents.push(
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
      return bookmarkComponents.length ? (
        bookmarkComponents
      ) : (
        <NoItemsSign>Create a bookmark from the menu above</NoItemsSign>
      );
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
