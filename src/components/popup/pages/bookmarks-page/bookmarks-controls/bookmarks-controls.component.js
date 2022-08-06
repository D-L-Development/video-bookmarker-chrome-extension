import React, { useContext, useState } from "react";
import {
  controlPageHeader_c,
  modalTypes,
} from "../../../../../constants/theme";
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
  MSG,
  sendMessageToActiveTab,
} from "../../../../../contentScripts/utility";
import { VerticalDivider } from "../../../shared/divider.styles";
import SkipIcon from "../../../../../icons/bookmarks-icons/skip-icon/skip.icon";
import MinusIcon from "../../../../../icons/bookmarks-icons/minus-icon/minus.icon";
import SpeedIcon from "../../../../../icons/bookmarks-icons/speed-icon/speed.icon";
import PlusIcon from "../../../../../icons/bookmarks-icons/plus-icon/plus.icon";
import {
  EdgeActionIcon,
  SpeedIconsGroup,
  SpinnerWrapper,
} from "./bookmarks-controls.styles";
import SpinnerIcon from "../../../../../icons/shared-icons/spinner-icon/spinner.icon";
import { BookmarksContext } from "../../../../../contexts/bookmarks.context";
import SaveArrowIcon from "../../../../../icons/save-arrow-icon/save-arrow.icon";

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
  const [isIconLoading, setIsIconLoading] = useState(false);

  const showErrorMsgModal = (message) => {
    setModalProps({
      title: "Alert",
      type: modalTypes.ALERT,
      closeBtnText: "Dismiss",
      message,
    });
    showModal();
  };

  const handleCreateBookmarkIconClick = (e) => {
    if (isIconLoading) return;
    setIsIconLoading(true);
    sendMessageToActiveTab({ type: MSG.GET_CURRENT_TIMESTAMP }, (res) => {
      setIsIconLoading(false);
      if (res.status !== MSG.SUCCESS) {
        // TODO: here you should ask the user if they are okay with adding bookmarks without a video
        showErrorMsgModal(res.message);
      } else {
        showModal(modalNames.BOOKMARK, {
          timestamp: res.payload.timestamp,
          isEditing: false,
        });
      }
    });
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
    sendMessageToActiveTab({ type, payload }, (res) => {
      setIsIconLoading(false);
      if (res.status !== MSG.SUCCESS) showErrorMsgModal(res.message);
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
    <PageHeaderControls className="PageHeader" color={controlPageHeader_c}>
      <ActionIconWrapper
        onClick={handleCreateBookmarkIconClick}
        enabled={!isIconLoading}
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
          handleContentScriptIconClick(MSG.REWIND, { seconds: skipSeconds })
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
        onClick={() => handleContentScriptIconClick(MSG.TOGGLE_PLAY)}
        enabled={!isIconLoading}
        title="play/pause"
      >
        <PlayPauseIcon
          {...defaultIconDimen}
          color={isIconLoading ? "grey" : "white"}
        />
      </ActionIconWrapper>
      <ActionIconWrapper
        onClick={() =>
          handleContentScriptIconClick(MSG.SKIP, { seconds: skipSeconds })
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
          onClick={() => handleContentScriptIconClick(MSG.SLOW_DOWN)}
          enabled={!isIconLoading}
          title="Decrease by 0.10x"
        >
          <MinusIcon
            {...smallerIconDimen}
            color={isIconLoading ? "grey" : "white"}
          />
        </EdgeActionIcon>
        <EdgeActionIcon enabled={false} title="Change playback speed">
          <SpeedIcon {...smallerIconDimen} color={"white"} />
        </EdgeActionIcon>
        <EdgeActionIcon
          onClick={() => handleContentScriptIconClick(MSG.SPEED_UP)}
          enabled={!isIconLoading}
          title="Increase by 0.10x"
        >
          <PlusIcon
            {...smallerIconDimen}
            color={isIconLoading ? "grey" : "white"}
          />
        </EdgeActionIcon>
      </SpeedIconsGroup>
      {isIconLoading && (
        <SpinnerWrapper>
          <SpinnerIcon width={"24px"} height={"24px"} color={"white"} />
        </SpinnerWrapper>
      )}
    </PageHeaderControls>
  );
};

export default BookmarksControlsComponent;