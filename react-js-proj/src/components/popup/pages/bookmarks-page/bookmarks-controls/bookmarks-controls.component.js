import React, { useContext } from "react";
import { controlPageHeader_c } from "../../../../../constants/theme";
import { ActionIconWrapper, PageHeaderControls } from "../../page.styles";
import AddBookmarkIcon from "../../../../../icons/add-bookmark-icon/add-bookmark.icon";
import CopyIcon from "../../../../../icons/copy-icon/copy.icon";
import SaveArrowIcon from "../../../../../icons/save-arrow-icon/save-arrow.icon";
import {
  ModalContext,
  modalNames,
} from "../../../../../contexts/modal.context";

const BookmarksControlsComponent = (props) => {
  const { showModal } = useContext(ModalContext);
  const handleDownloadIconClick = (e) => {};
  const handleCreateBookmarkIconClick = (e) => {
    showModal(modalNames.BOOKMARK);
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
    </PageHeaderControls>
  );
};

export default BookmarksControlsComponent;
