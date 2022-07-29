import React, { useState } from "react";
import AddCircleIcon from "../../../../../../icons/add-circle-icon/add-circle.icon";
import {
  NewButton,
  NewButtonText,
  NewButtonWrapper,
} from "./new-button.styles";
import OutlineArrowIcon from "../../../../../../icons/outline-arrow-icon/outline-arrow.icon";
import ContextMenuComponent from "../../../../shared/context-menu/context-menu.component";
import FolderPlusIcon from "../../../../../../icons/folder-plus-icon/folder-plus.icon";
import {
  ContextMenuItem,
  ContextMenuItemIcon,
  ContextMenuItemText,
} from "../../../../shared/context-menu/context-menu.styles";
import BookmarksIcon from "../../../../../../icons/bookmarks-icon/bookmarks.icon";

const NewButtonComponent = (props) => {
  const [showContextMenu, setShowContextMenu] = useState(false);
  return (
    <NewButtonWrapper onClick={() => setShowContextMenu(true)}>
      <NewButton>
        <AddCircleIcon width={"18px"} height={"18px"} color={"white"} />
        <NewButtonText>New</NewButtonText>
        <OutlineArrowIcon
          width={"12px"}
          height={"12px"}
          color={"white"}
          direction={"down"}
        />
      </NewButton>
      {showContextMenu && (
        <ContextMenuComponent
          close={() => setShowContextMenu(false)}
          color={"black"}
          bgColor={"white"}
        >
          <ContextMenuItem>
            <ContextMenuItemIcon>
              <BookmarksIcon width={"18px"} height={"18px"} color={"grey"} />
            </ContextMenuItemIcon>
            <ContextMenuItemText>Create File</ContextMenuItemText>
          </ContextMenuItem>
          <ContextMenuItem>
            <ContextMenuItemIcon>
              <FolderPlusIcon width={"18px"} height={"18px"} color={"grey"} />
            </ContextMenuItemIcon>
            <ContextMenuItemText>Create Folder</ContextMenuItemText>
          </ContextMenuItem>
        </ContextMenuComponent>
      )}
    </NewButtonWrapper>
  );
};

export default NewButtonComponent;
