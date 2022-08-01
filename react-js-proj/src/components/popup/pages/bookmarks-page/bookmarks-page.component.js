import React, { useEffect, useState } from "react";
import { StyledPage } from "../page.styles";
import * as Styled from "./bookmarks-page.styles";
import BookmarkComponent from "./bookmark/bookmark.component";

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
  const [state, setState] = useState({
    isLoading: true,
    bookmarks: {},
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storage = await chrome.storage.sync.get(fileUuid);
        if (chrome.runtime.lastError) throw chrome.runtime.lastError;
        if (storage[fileUuid]) {
          setState({
            bookmarks: storage[fileUuid].bookmarks,
            isLoading: false,
          });
        } else {
          setState({ ...state, isLoading: false });
          throw new Error("Something went wrong opening file");
        }
      } catch (e) {
        throw e;
      }
    };

    fetchData();
  }, []);

  const renderBookmarks = () => {
    if (state.isLoading) {
      return null;
    } else {
      const data = [];
      for (let key in state.bookmarks) {
        const { isNested, title, text } = state.bookmarks[key];
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
