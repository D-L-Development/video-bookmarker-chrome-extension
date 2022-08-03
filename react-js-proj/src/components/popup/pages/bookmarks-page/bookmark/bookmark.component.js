import React from "react";
import * as Styled from "./bookmark.styles";
import TrashIcon from "../../../../../icons/trash-icon/trash.icon";
import EditIcon from "../../../../../icons/edit-icon/edit.icon";
import IndentIcon from "../../../../../icons/bookmarks-icons/indent-icon/indent.icon";

const IconProps = {
  width: "20px",
  height: "20px",
  color: "white",
};

const BookmarkComponent = ({ title, timestamp, text, isNested }) => {
  return (
    <Styled.Bookmark isNested={isNested}>
      <Styled.BookmarkHeader isNested={isNested}>
        <Styled.BookmarkHeaderText>
          <Styled.BookmarkTimestamp>{timestamp}</Styled.BookmarkTimestamp>
          <Styled.BookmarkTitle>{title}</Styled.BookmarkTitle>
        </Styled.BookmarkHeaderText>
        <Styled.BookmarkHeaderIconGroup>
          <Styled.BookmarkIconWrapper>
            <IndentIcon
              {...IconProps}
              type={isNested ? "decrease" : "increase"}
            />
          </Styled.BookmarkIconWrapper>
          <Styled.BookmarkIconWrapper>
            <EditIcon {...IconProps} />
          </Styled.BookmarkIconWrapper>
          <Styled.BookmarkIconWrapper>
            <TrashIcon {...IconProps} />
          </Styled.BookmarkIconWrapper>
        </Styled.BookmarkHeaderIconGroup>
      </Styled.BookmarkHeader>
      <Styled.BookmarkBodyText>{text}</Styled.BookmarkBodyText>
    </Styled.Bookmark>
  );
};

export default BookmarkComponent;
