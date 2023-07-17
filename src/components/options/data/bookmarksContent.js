import {
  Bookmark,
  BookmarkBodyText,
  BookmarkHeader,
  BookmarkHeaderIconGroup,
  BookmarkHeaderText,
  BookmarkIconWrapper,
  BookmarkTimestamp,
  BookmarkTitle,
} from "../../popup/pages/bookmarks-page/bookmark/bookmark.styles";
import IndentIcon from "../../../icons/bookmarks-icons/indent-icon/indent.icon";
import { BookmarkIconProps } from "../../popup/pages/bookmarks-page/bookmark/bookmark.component";
import EditIcon from "../../../icons/edit-icon/edit.icon";
import TrashIcon from "../../../icons/trash-icon/trash.icon";
import React from "react";
import { Container } from "../shared.styles";

export const BOOKMARKS = [
  {
    title: "Causes of the American Revolution",
    text: "The lecturer discusses the various causes that led to the American Revolution, including issues like taxation without representation and the growing desire for independence.",
    timestamp: "00:05:20",
    isNested: false,
  },
  {
    title: "Key Events and Battles",
    text: "The lecturer highlights significant events and battles during the American Revolution, such as the Battle of Lexington and Concord, the Declaration of Independence, and the Siege of Yorktown.",
    timestamp: "00:22:50",
    isNested: false,
  },
  {
    title: "Role of Founding Fathers",
    text: "The lecturer explores the crucial role played by key Founding Fathers like George Washington, Thomas Jefferson, and Benjamin Franklin in shaping the course of the American Revolution.",
    timestamp: "00:41:15",
    isNested: true,
  },
  {
    title: "Impact and Legacy",
    text: "The lecturer examines the lasting impact of the American Revolution on American society, politics, and governance, as well as its influence on other independence movements worldwide.",
    timestamp: "01:10:05",
    isNested: true,
  },
];

export const renderBookmarks = () => (
  <Container gap={"0"}>
    {BOOKMARKS.map(({ title, text, timestamp, isNested }) => (
      <Bookmark isNested={isNested} key={timestamp + title}>
        <BookmarkHeader isNested={isNested}>
          <BookmarkHeaderText>
            <BookmarkTimestamp title={`Skip video to ${timestamp}`}>
              {timestamp}
            </BookmarkTimestamp>
          </BookmarkHeaderText>
          <BookmarkHeaderIconGroup>
            <BookmarkIconWrapper
              title={isNested ? "Outdent" : "Indent"}
              enabled={true}
            >
              <IndentIcon
                {...BookmarkIconProps}
                type={isNested ? "decrease" : "increase"}
              />
            </BookmarkIconWrapper>
            <BookmarkIconWrapper title="Edit Bookmark" enabled={true}>
              <EditIcon {...BookmarkIconProps} />
            </BookmarkIconWrapper>
            <BookmarkIconWrapper title="Delete Bookmark" enabled={true}>
              <TrashIcon {...BookmarkIconProps} />
            </BookmarkIconWrapper>
          </BookmarkHeaderIconGroup>
        </BookmarkHeader>
        <BookmarkTitle>{title}</BookmarkTitle>
        <BookmarkBodyText>{text}</BookmarkBodyText>
      </Bookmark>
    ))}
  </Container>
);
