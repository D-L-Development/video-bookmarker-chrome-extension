import React from "react";
import * as Styled from "./bookmark.styles";
import { HighlightedText } from "./bookmark.styles";
import TrashIcon from "../../../../../icons/trash-icon/trash.icon";
import EditIcon from "../../../../../icons/edit-icon/edit.icon";
import IndentIcon from "../../../../../icons/bookmarks-icons/indent-icon/indent.icon";
import {
  guid,
  MSG,
  sendMessageToActiveTab,
} from "../../../../../contentScripts/utility";

const IconProps = {
  width: "20px",
  height: "20px",
  color: "white",
};

const BookmarkComponent = ({
  title,
  timestamp,
  text,
  isNested,
  searchQuery,
}) => {
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
  const getHighlightedText = (text, highlight) => {
    // if the search term is nothing, then return the text
    if (highlight.toLowerCase().trim() === "") return <span>{text}</span>;
    // Split on highlight term and include term into parts, ignore case
    const parts = text.split(new RegExp(`(${highlight})`, "gi"));
    return (
      <>
        {parts.map((part) =>
          part.toLowerCase() === highlight.toLowerCase() ? (
            <HighlightedText key={guid()}>{part}</HighlightedText>
          ) : (
            <span key={guid()}>{part}</span>
          )
        )}
      </>
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
          <Styled.BookmarkTitle>
            {getHighlightedText(title, searchQuery)}
          </Styled.BookmarkTitle>
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
      <Styled.BookmarkBodyText>
        {getHighlightedText(text, searchQuery)}
      </Styled.BookmarkBodyText>
    </Styled.Bookmark>
  );
};

export default BookmarkComponent;
