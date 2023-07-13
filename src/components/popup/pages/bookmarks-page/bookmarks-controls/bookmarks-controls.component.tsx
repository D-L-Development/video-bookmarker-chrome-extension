import React, { useContext, useEffect, useState } from "react";
import { modalTypes } from "../../../../../constants/theme";
import { ActionIconWrapper, PageHeaderControls } from "../../page.styles";
import AddBookmarkIcon from "../../../../../icons/bookmarks-icons/add-bookmark-icon/add-bookmark.icon";
import CopyIcon from "../../../../../icons/bookmarks-icons/copy-icon/copy.icon";
import {
  ModalContext,
  modalNames,
} from "../../../../../contexts/modal.context";
import PlayPauseIcon from "../../../../../icons/bookmarks-icons/play-pause-icon/play-pause.icon";
import {
  copyStringToClipboard,
  sendMessageToActiveTab,
  UI_ACTIONS,
  VIDEO_ACTIONS,
} from "../../../../../contentScripts/utility";
import { VerticalDivider } from "../../../shared/divider.styles";
import SkipIcon from "../../../../../icons/bookmarks-icons/skip-icon/skip.icon";
import MinusIcon from "../../../../../icons/bookmarks-icons/minus-icon/minus.icon";
import SpeedIcon from "../../../../../icons/bookmarks-icons/speed-icon/speed.icon";
import PlusIcon from "../../../../../icons/bookmarks-icons/plus-icon/plus.icon";
import {
  EdgeActionIcon,
  SpeedIconsGroup,
  SpeedText,
  SpinnerWrapper,
} from "./bookmarks-controls.styles";
import SpinnerIcon from "../../../../../icons/shared-icons/spinner-icon/spinner.icon";
import { BookmarksContext } from "../../../../../contexts/bookmarks.context";
import SaveArrowIcon from "../../../../../icons/save-arrow-icon/save-arrow.icon";
import { SettingsContext } from "../../../../../contexts/settings.context";
import { COMMANDS } from "../../../../../constants/constants";
import { VideoContext } from "../../../../../contexts/video.context";

const DownloadButtonComponent = React.lazy(() =>
  import(
    /* webpackPrefetch: true */ "./download-button/download-button.component"
  )
);

const skipSeconds = 10;
export const defaultIconDimen = {
  width: "20px",
  height: "20px",
};

const smallerIconDimen = {
  width: "18px",
  height: "18px",
};

const BookmarksControlsComponent = (props) => {
  const { showModal, setModalProps } = useContext(ModalContext);
  const { bookmarks, isLoading } = useContext(BookmarksContext);
  const settings = useContext(SettingsContext);
  const video = useContext(VideoContext);
  const [isIconLoading, setIsIconLoading] = useState(false);

  useEffect(() => {
    const addBookmarkListener = (command) => {
      if (command !== COMMANDS.ADD_BOOKMARK || isIconLoading) return;
      sendMessageToActiveTab({ type: UI_ACTIONS.OPEN_POPUP });
      checkIfShouldPauseVideo();
      handleCreateBookmarkIconClick();
    };
    // listen to shortcut for creating a bookmark
    chrome.commands.onCommand.addListener(addBookmarkListener);
    // remove listener on unmount
    return () => {
      chrome.commands.onCommand.removeListener(addBookmarkListener);
    };
  }, [settings]);

  const showErrorMsgModal = (message) => {
    setModalProps({
      title: "Alert",
      type: modalTypes.ALERT,
      closeBtnText: "Dismiss",
      message,
    });
    showModal();
  };

  const checkIfShouldPauseVideo = () => {
    // pause the video if the settings context indicates that
    if (!settings.isLoading && settings.pauseVideoOnAction) {
      sendMessageToActiveTab({ type: VIDEO_ACTIONS.PAUSE });
    }
  };

  const handleCreateBookmarkIconClick = (e) => {
    if (isIconLoading) return;
    setIsIconLoading(true);
    checkIfShouldPauseVideo();
    if (chrome.runtime.lastError) {
      return showErrorMsgModal("Failed to find video in the page");
    }
    sendMessageToActiveTab(
      { type: VIDEO_ACTIONS.GET_CURRENT_TIMESTAMP },
      (res) => {
        setIsIconLoading(false);
        if (chrome.runtime.lastError) {
          return showErrorMsgModal("Failed to find video in the page");
        }

        showModal(modalNames.BOOKMARK, {
          timestamp: res.payload.timestamp,
          isEditing: false,
        });
      }
    );
  };

  const bookmarksToString = (bookmarks) => {
    const TAB_CHAR = String.fromCharCode(9);
    const NEWLINE_CHAR = String.fromCharCode(10);
    let formattedString = "";
    for (let key in bookmarks) {
      const indentSpace = bookmarks[key].isNested ? TAB_CHAR : "";
      formattedString +=
        indentSpace +
        key +
        TAB_CHAR +
        bookmarks[key].title +
        NEWLINE_CHAR +
        indentSpace +
        bookmarks[key].text +
        NEWLINE_CHAR;
    }

    return formattedString;
  };

  const handleContentScriptIconClick = (type, payload = null) => {
    // dismiss the click when loading
    if (isIconLoading) return;
    // set loading to true until content script responds
    setIsIconLoading(true);
    sendMessageToActiveTab({ type, payload }, () => {
      setIsIconLoading(false);
      if (chrome.runtime.lastError) {
        return showErrorMsgModal("Failed to find video in the page");
      }
    });
  };
  const handleCopyIconClick = () => {
    if (!isLoading && Object.keys(bookmarks).length) {
      copyStringToClipboard(bookmarksToString(bookmarks));
      setModalProps({
        title: "Success!",
        type: modalTypes.WARNING,
        message: "Bookmarks have been copied as a table to your clipboard!",
        closeBtnText: "Dismiss",
      });
      showModal();
    }
  };
  return (
    <PageHeaderControls className="PageHeader">
      <ActionIconWrapper
        onClick={handleCreateBookmarkIconClick}
        enabled={!isIconLoading && !settings.isLoading}
        title="Add bookmark"
      >
        <AddBookmarkIcon
          {...defaultIconDimen}
          color={isIconLoading ? "grey" : "white"}
        />
      </ActionIconWrapper>
      <ActionIconWrapper
        onClick={handleCopyIconClick}
        enabled={Object.keys(bookmarks).length}
        disabled={Object.keys(bookmarks).length === 0}
        disableColorChangeDelay={true}
        title="Copy as Table"
      >
        <CopyIcon
          {...defaultIconDimen}
          color={Object.keys(bookmarks).length ? "white" : "grey"}
        />
      </ActionIconWrapper>
      {/* Show grey icon if component hasn't loaded */}
      <React.Suspense
        fallback={
          <ActionIconWrapper enabled={false}>
            <SaveArrowIcon {...defaultIconDimen} color={"grey"} />
          </ActionIconWrapper>
        }
      >
        <DownloadButtonComponent />
      </React.Suspense>
      <VerticalDivider />
      <ActionIconWrapper
        style={{ marginLeft: "0.5rem" }}
        onClick={() =>
          handleContentScriptIconClick(VIDEO_ACTIONS.REWIND, {
            seconds: skipSeconds,
          })
        }
        enabled={!isIconLoading}
        title={`Rewind ${skipSeconds} seconds`}
      >
        <SkipIcon
          {...defaultIconDimen}
          color={isIconLoading ? "grey" : "white"}
          direction={"left"}
        />
      </ActionIconWrapper>
      <ActionIconWrapper
        onClick={() => handleContentScriptIconClick(VIDEO_ACTIONS.TOGGLE_PLAY)}
        enabled={!isIconLoading}
        title={video.paused ? "play" : "pause"}
      >
        <PlayPauseIcon
          {...defaultIconDimen}
          color={isIconLoading ? "grey" : "white"}
          type={video.paused ? "play" : "pause"}
        />
      </ActionIconWrapper>
      <ActionIconWrapper
        onClick={() =>
          handleContentScriptIconClick(VIDEO_ACTIONS.SKIP, {
            seconds: skipSeconds,
          })
        }
        enabled={!isIconLoading}
        title={`Skip ${skipSeconds} seconds`}
      >
        <SkipIcon
          {...defaultIconDimen}
          color={isIconLoading ? "grey" : "white"}
          direction={"right"}
        />
      </ActionIconWrapper>
      <SpeedIconsGroup>
        <EdgeActionIcon
          onClick={() => handleContentScriptIconClick(VIDEO_ACTIONS.SLOW_DOWN)}
          enabled={!isIconLoading}
          title="Decrease by 0.10x"
        >
          <MinusIcon
            {...smallerIconDimen}
            color={isIconLoading ? "grey" : "white"}
          />
        </EdgeActionIcon>
        <EdgeActionIcon
          enabled={!isIconLoading}
          title="Reset playback speed"
          onClick={() =>
            handleContentScriptIconClick(VIDEO_ACTIONS.RESET_SPEED)
          }
        >
          <SpeedIcon
            {...smallerIconDimen}
            color={isIconLoading ? "grey" : "white"}
          />
        </EdgeActionIcon>
        <EdgeActionIcon
          onClick={() => handleContentScriptIconClick(VIDEO_ACTIONS.SPEED_UP)}
          enabled={!isIconLoading}
          title="Increase by 0.10x"
        >
          <PlusIcon
            {...smallerIconDimen}
            color={isIconLoading ? "grey" : "white"}
          />
        </EdgeActionIcon>
      </SpeedIconsGroup>
      {!video.isLoading && (
        <SpeedText>{"x" + video.playbackRate.toFixed(2).toString()}</SpeedText>
      )}

      {isIconLoading && (
        <SpinnerWrapper style={{ marginRight: "0.5rem" }}>
          <SpinnerIcon width={"24px"} height={"24px"} color={"white"} />
        </SpinnerWrapper>
      )}
    </PageHeaderControls>
  );
};

export default BookmarksControlsComponent;
