import React from "react";
import PropTypes from "prop-types";
import * as Styled from "./bookmark.styles";
import TrashIcon from "../../../../../icons/trash-icon/trash.icon";
import EditIcon from "../../../../../icons/edit-icon/edit.icon";
import IndentIcon from "../../../../../icons/indent-icon/indent.icon";

const IconProps = {
  width: "20px",
  height: "20px",
  color: "white",
};

const BookmarkComponent = ({ title, timestamp, text, isNested }) => {
  return (
    <Styled.Bookmark>
      <Styled.BookmarkHeader>
        <Styled.BookmarkHeaderText>
          <Styled.BookmarkTimestamp>{timestamp}</Styled.BookmarkTimestamp>
          <Styled.BookmarkTitle>{title}</Styled.BookmarkTitle>
        </Styled.BookmarkHeaderText>
        <Styled.BookmarkHeaderIconGroup>
          <Styled.BookmarkIconWrapper>
            <IndentIcon {...IconProps} type="decrease" />
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
