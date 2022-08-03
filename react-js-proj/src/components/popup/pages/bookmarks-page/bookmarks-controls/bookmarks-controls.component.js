import React, { useContext } from "react";
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
  const handleDownloadIconClick = (e) => {};
  const handleCreateBookmarkIconClick = (e) => {
    showModal(modalNames.BOOKMARK);
  };
  const handlePlayPauseIconClick = (e) => {
    sendMessageToActiveTab({ type: MSG.TOGGLE_PLAY }, (res) => {
      // TODO: disable button when clicked until you get a response
      if (res.status !== MSG.SUCCESS) alert(res.message);
    });
  };
  const handleCopyIconClick = (e) => {};
  return (
    <PageHeaderControls className="PageHeader" color={controlPageHeader_c}>
      <ActionIconWrapper onClick={handleCreateBookmarkIconClick} enabled={true}>
        <AddBookmarkIcon width={"20px"} height={"20px"} color={"white"} />
      </ActionIconWrapper>
      <ActionIconWrapper onClick={handleCopyIconClick} enabled={true}>
        <CopyIcon width={"20px"} height={"20px"} color={"white"} />
      </ActionIconWrapper>
      <ActionIconWrapper onClick={handleDownloadIconClick} enabled={true}>
        <SaveArrowIcon width={"20px"} height={"20px"} color={"white"} />
      </ActionIconWrapper>
      <ActionIconWrapper
        onClick={handlePlayPauseIconClick}
        enabled={true}
        title="play/pause"
      >
        <PlayPauseIcon width={"20px"} height={"20px"} color={"white"} />
      </ActionIconWrapper>
    </PageHeaderControls>
  );
};

export default BookmarksControlsComponent;
