import React, { useContext, useState } from "react";
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
import {
  ModalContext,
  modalNames,
} from "../../../../../../contexts/modal.context";

const options = {
  NEW_FILE: "new file",
  NEW_FOLDER: "new folder",
};

const NewButtonComponent = (props) => {
  const [showContextMenu, setShowContextMenu] = useState(false);
  const { showModal, setModalProps, hideMessageModal } =
    useContext(ModalContext);

  const handleContextMenuItemClick = (e, option) => {
    // close context menu
    setShowContextMenu(false);
    switch (option) {
      case options.NEW_FILE:
        showModal(modalNames.FILE);
        break;
      case options.NEW_FOLDER:
        showModal(modalNames.FOLDER);
        break;
      default:
        break;
    }
  };

  return (
    <NewButtonWrapper>
      <NewButton onClick={() => setShowContextMenu(true)}>
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
        <ContextMenuComponent close={() => setShowContextMenu(false)}>
          <ContextMenuItem
            onClick={(e) => handleContextMenuItemClick(e, options.NEW_FILE)}
          >
            <ContextMenuItemIcon>
              <BookmarksIcon width={"18px"} height={"18px"} color={"grey"} />
            </ContextMenuItemIcon>
            <ContextMenuItemText>Create File</ContextMenuItemText>
          </ContextMenuItem>
          <ContextMenuItem
            onClick={(e) => handleContextMenuItemClick(e, options.NEW_FOLDER)}
          >
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
