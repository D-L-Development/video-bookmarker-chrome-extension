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
import { VerticalDivider } from "../../../shared/divider.styles";
import SkipIcon from "../../../../../icons/bookmarks-icons/skip-icon/skip.icon";

const skipSeconds = 10;

const BookmarksControlsComponent = (props) => {
  const { showModal } = useContext(ModalContext);
  const [isIconLoading, setIsIconLoading] = useState(false);
  const handleDownloadIconClick = (e) => {};
  const handleCreateBookmarkIconClick = (e) => {
    showModal(modalNames.BOOKMARK);
  };
  const handleContentScriptIconClick = (e, type, payload = null) => {
    // dismiss the click when loading
    if (isIconLoading) return;
    // set loading to true until content script responds
    setIsIconLoading(true);
    sendMessageToActiveTab({ type, payload }, (res) => {
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
      <VerticalDivider />
      <ActionIconWrapper
        style={{ marginLeft: "0.5rem" }}
        onClick={(e) =>
          handleContentScriptIconClick(e, MSG.REWIND, { seconds: skipSeconds })
        }
        enabled={!isIconLoading}
        title={`Rewind ${skipSeconds} seconds`}
      >
        <SkipIcon
          width={"20px"}
          height={"20px"}
          color={isIconLoading ? "grey" : "white"}
          direction={"left"}
        />
      </ActionIconWrapper>
      <ActionIconWrapper
        onClick={(e) => handleContentScriptIconClick(e, MSG.TOGGLE_PLAY)}
        enabled={!isIconLoading}
        title="play/pause"
      >
        <PlayPauseIcon
          width={"20px"}
          height={"20px"}
          color={isIconLoading ? "grey" : "white"}
        />
      </ActionIconWrapper>
      <ActionIconWrapper
        onClick={(e) =>
          handleContentScriptIconClick(e, MSG.SKIP, { seconds: skipSeconds })
        }
        enabled={!isIconLoading}
        title={`Skip ${skipSeconds} seconds`}
      >
        <SkipIcon
          width={"20px"}
          height={"20px"}
          color={isIconLoading ? "grey" : "white"}
          direction={"right"}
        />
      </ActionIconWrapper>
    </PageHeaderControls>
  );
};

export default BookmarksControlsComponent;
