import React, { useContext } from "react";
import { controlPageHeader_c } from "../../../../../constants/theme";
import { ActionIconWrapper, PageHeaderControls } from "../../page.styles";
import AddBookmarkIcon from "../../../../../icons/add-bookmark-icon/add-bookmark.icon";
import CopyIcon from "../../../../../icons/copy-icon/copy.icon";
import SaveArrowIcon from "../../../../../icons/save-arrow-icon/save-arrow.icon";
import {
  bookmarksActions,
  BookmarksDispatchContext,
} from "../../../../../contexts/bookmarks.context";

const BookmarksControlsComponent = (props) => {
  const dispatch = useContext(BookmarksDispatchContext);
  const handleDownloadIconClick = (e) => {};
  const handleCreateBookmarkIconClick = (e) => {
    dispatch({
      type: bookmarksActions.ADD,
      payload: {
        timestamp: "32:12:54",
        bookmark: { text: "lorem", title: "this is a title", isNested: true },
      },
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
    </PageHeaderControls>
  );
};

export default BookmarksControlsComponent;
