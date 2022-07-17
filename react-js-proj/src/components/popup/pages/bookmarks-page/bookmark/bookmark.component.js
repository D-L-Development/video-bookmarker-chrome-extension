import React from "react";
import PropTypes from "prop-types";
import * as Styled from "./bookmark.styles";

const BookmarkComponent = ({ title, timestamp, text, isNested }) => {
  return (
    <Styled.Bookmark>
      <Styled.BookmarkHeader>
        <Styled.BookmarkHeaderText>
          <Styled.BookmarkTimestamp>{timestamp}</Styled.BookmarkTimestamp>
          <Styled.BookmarkTitle>{title}</Styled.BookmarkTitle>
        </Styled.BookmarkHeaderText>
        <Styled.BookmarkHeaderIconGroup>
          <Styled.BookmarkIconWrapper></Styled.BookmarkIconWrapper>
          <Styled.BookmarkIconWrapper></Styled.BookmarkIconWrapper>
          <Styled.BookmarkIconWrapper></Styled.BookmarkIconWrapper>
        </Styled.BookmarkHeaderIconGroup>
      </Styled.BookmarkHeader>
      <Styled.BookmarkBodyText>{text}</Styled.BookmarkBodyText>
    </Styled.Bookmark>
  );
};

export default BookmarkComponent;
