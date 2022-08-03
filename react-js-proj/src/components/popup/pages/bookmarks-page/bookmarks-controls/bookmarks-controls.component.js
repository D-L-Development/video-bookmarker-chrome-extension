import React, { useContext, useState } from "react";
import { controlPageHeader_c } from "../../../../../constants/theme";
import { ActionIconWrapper, PageHeaderControls } from "../../page.styles";
import AddBookmarkIcon from "../../../../../icons/bookmarks-icons/add-bookmark-icon/add-bookmark.icon";
import CopyIcon from "../../../../../icons/bookmarks-icons/copy-icon/copy.icon";
import SaveArrowIcon from "../../../../../icons/save-arrow-icon/save-arrow.icon";
import {
  ModalContext,
  modalNames,
} from "../../../../../contexts/modal.context";
import PlayPauseIcon from "../../../../../icons/bookmarks-icons/play-pause-icon/play-pause.icon";
import {
  MSG,
  sendMessageToActiveTab,
} from "../../../../../contentScripts/utility";

const BookmarksControlsComponent = (props) => {
  const { showModal } = useContext(ModalContext);
  const [isIconLoading, setIsIconLoading] = useState(false);
  const handleDownloadIconClick = (e) => {};
  const handleCreateBookmarkIconClick = (e) => {
    showModal(modalNames.BOOKMARK);
  };
  const handlePlayPauseIconClick = (e) => {
    // dismiss the click when loading
    if (isIconLoading) return;
    // set loading to true until content script responds
    setIsIconLoading(true);
    sendMessageToActiveTab({ type: MSG.TOGGLE_PLAY }, (res) => {
      setIsIconLoading(false);
      if (res.status !== MSG.SUCCESS) alert(res.message);
    });
  };
  const handleCopyIconClick = (e) => {};
  return (
    <PageHeaderControls className="PageHeader" color={controlPageHeader_c}>
      <ActionIconWrapper
        onClick={handleCreateBookmarkIconClick}
        enabled={true}
        title="Add bookmark"
      >
        <AddBookmarkIcon width={"20px"} height={"20px"} color={"white"} />
      </ActionIconWrapper>
      <ActionIconWrapper
        onClick={handleCopyIconClick}
        enabled={true}
        title="Copy as Table"
      >
        <CopyIcon width={"20px"} height={"20px"} color={"white"} />
      </ActionIconWrapper>
      <ActionIconWrapper
        onClick={handleDownloadIconClick}
        enabled={true}
        title="Download"
      >
        <SaveArrowIcon width={"20px"} height={"20px"} color={"white"} />
      </ActionIconWrapper>
      <ActionIconWrapper
        onClick={handlePlayPauseIconClick}
        enabled={!isIconLoading}
        title="play/pause"
      >
        <PlayPauseIcon
          width={"20px"}
          height={"20px"}
          color={isIconLoading ? "grey" : "white"}
        />
      </ActionIconWrapper>
    </PageHeaderControls>
  );
};

export default BookmarksControlsComponent;
