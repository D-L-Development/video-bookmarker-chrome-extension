import React from "react";
import * as Styled from "./bookmark.styles";
import TrashIcon from "../../../../../icons/trash-icon/trash.icon";
import EditIcon from "../../../../../icons/edit-icon/edit.icon";
import IndentIcon from "../../../../../icons/bookmarks-icons/indent-icon/indent.icon";
import {
  MSG,
  sendMessageToActiveTab,
} from "../../../../../contentScripts/utility";

const IconProps = {
  width: "20px",
  height: "20px",
  color: "white",
};

const BookmarkComponent = ({ title, timestamp, text, isNested }) => {
  const handleTimestampClick = () => {
    sendMessageToActiveTab(
      {
        type: MSG.JUMP_TO_TIMESTAMP,
        payload: { timestamp },
      },
      (res) => {
        if (res.status !== MSG.SUCCESS) alert(res.message);
      }
    );
  };
  return (
    <Styled.Bookmark isNested={isNested}>
      <Styled.BookmarkHeader isNested={isNested}>
        <Styled.BookmarkHeaderText>
          <Styled.BookmarkTimestamp onClick={handleTimestampClick}>
            {/* TODO: render a spinner here when loading */}
            {timestamp}
          </Styled.BookmarkTimestamp>
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
