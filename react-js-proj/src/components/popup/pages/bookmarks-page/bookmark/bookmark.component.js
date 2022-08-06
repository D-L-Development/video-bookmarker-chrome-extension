import React, { useContext, useState } from "react";
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
import { ActionIconWrapper } from "../../page.styles";
import {
  bookmarksActions,
  BookmarksDispatchContext,
} from "../../../../../contexts/bookmarks.context";
import { modalTypes } from "../../../../../constants/theme";
import {
  ModalContext,
  modalNames,
} from "../../../../../contexts/modal.context";
import SpinnerIcon from "../../../../../icons/shared-icons/spinner-icon/spinner.icon";
import { SpinnerWrapper } from "../bookmarks-controls/bookmarks-controls.styles";

const IconProps = {
  width: "18px",
  height: "18px",
  color: "white",
};

const BookmarkComponent = ({
  title,
  timestamp,
  text,
  isNested,
  searchQuery,
}) => {
  const dispatch = useContext(BookmarksDispatchContext);
  const { setModalProps, hideMessageModal, showModal } =
    useContext(ModalContext);
  const [timestampIsLoading, setTimestampIsLoading] = useState(false);

  const handleTimestampClick = () => {
    if (timestampIsLoading) return;
    setTimestampIsLoading(true);
    sendMessageToActiveTab(
      {
        type: MSG.JUMP_TO_TIMESTAMP,
        payload: { timestamp },
      },
      (res) => {
        setTimestampIsLoading(false);
        if (res.status !== MSG.SUCCESS) {
          setModalProps({
            title: "Failed!",
            type: modalTypes.ALERT,
            message: res.message,
            closeBtnText: "Dismiss",
          });
          showModal();
        }
      }
    );
  };

  const handleDeleteIconClick = (e) => {
    setModalProps({
      onClose: hideMessageModal,
      onSubmit: () => {
        dispatch({ type: bookmarksActions.DELETE, payload: { timestamp } });

        hideMessageModal();
      },
      title: "Warning!",
      type: modalTypes.WARNING,
      message: `Are you sure you want to delete bookmark ${
        timestamp && "at " + timestamp
      }?`,
      closeBtnText: "No",
      submitBtnText: "Yes",
    });
    showModal();
  };

  const toggleIndent = (e) => {
    dispatch({ type: bookmarksActions.TOGGLE_NEST, payload: { timestamp } });
  };

  const handleEditIconClick = (e) => {
    showModal(modalNames.BOOKMARK, {
      title,
      text,
      timestamp,
      isNested,
      isEditing: true,
    });
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
          <Styled.BookmarkTimestamp
            onClick={handleTimestampClick}
            title={"Skip video to timestamp"}
          >
            {timestampIsLoading ? (
              <SpinnerWrapper>
                <SpinnerIcon width={"10px"} height={"10px"} color={"white"} />
              </SpinnerWrapper>
            ) : (
              timestamp
            )}
          </Styled.BookmarkTimestamp>
          <Styled.BookmarkTitle>
            {getHighlightedText(title, searchQuery)}
          </Styled.BookmarkTitle>
        </Styled.BookmarkHeaderText>
        <Styled.BookmarkHeaderIconGroup>
          <ActionIconWrapper
            title={isNested ? "Outdent" : "Indent"}
            enabled={true}
            onClick={toggleIndent}
          >
            <IndentIcon
              {...IconProps}
              type={isNested ? "decrease" : "increase"}
            />
          </ActionIconWrapper>
          <ActionIconWrapper
            title="Edit Bookmark"
            enabled={true}
            onClick={handleEditIconClick}
          >
            <EditIcon {...IconProps} />
          </ActionIconWrapper>
          <ActionIconWrapper
            title="Delete Bookmark"
            enabled={true}
            onClick={handleDeleteIconClick}
          >
            <TrashIcon {...IconProps} />
          </ActionIconWrapper>
        </Styled.BookmarkHeaderIconGroup>
      </Styled.BookmarkHeader>
      <Styled.BookmarkBodyText>
        {getHighlightedText(text, searchQuery)}
      </Styled.BookmarkBodyText>
    </Styled.Bookmark>
  );
};

export default BookmarkComponent;
