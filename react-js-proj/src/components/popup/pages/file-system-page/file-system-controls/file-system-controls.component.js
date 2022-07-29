import React, { useContext, useEffect, useState } from "react";
import { controlPageHeader_c } from "../../../../../constants/theme";
import {
  ActionIconWrapper,
  NewButton,
  NewButtonText,
  PageHeaderControls,
} from "./file-system-controls.styles";
import TrashIcon from "../../../../../icons/trash-icon/trash.icon";
import EditIcon from "../../../../../icons/edit-icon/edit.icon";
import MoveIcon from "../../../../../icons/move-icon/move.icon";
import {
  FileSystemContext,
  fsDispatchContext,
} from "../../../../../contexts/file-system.context";
import FileModalComponent from "../../../../modals-forms/file-modal/file-modal.component";
import FolderModalComponent from "../../../../modals-forms/folder-modal/folder-modal.component";
import { fsActions } from "../../../../../reducers/file-system.reducer";
import AddCircleIcon from "../../../../../icons/add-circle-icon/add-circle.icon";
import OutlineArrowIcon from "../../../../../icons/outline-arrow-icon/outline-arrow.icon";

const iconActionType = {
  DELETE: "delete",
  MOVE: "move",
  EDIT: "edit",
};

const FileSystemControlsComponent = (props) => {
  const fsDispatch = useContext(fsDispatchContext);
  const fs = useContext(FileSystemContext);
  const [selections, setSelections] = useState({});
  const [showEditFileModal, setShowEditFileModal] = useState(false);
  const [showEditFolderModal, setShowEditFolderModal] = useState(false);

  const handleClick = (e, iconType) => {
    console.log("Icon Click");
    e.stopPropagation();

    switch (iconType) {
      case iconActionType.MOVE:
        break;
      case iconActionType.DELETE:
        if (anySelected()) {
          const { fileIds, folderIds } = getSelectedItemsIds();
          fsDispatch({
            type: fsActions.REMOVE,
            payload: { fileIds, folderIds },
          });
        }
        break;
      case iconActionType.EDIT:
        if (onlyOneSelected()) {
          if (selections.files.length === 1) {
            setShowEditFileModal(true);
          } else {
            setShowEditFolderModal(true);
          }
        }
        break;
      default:
        break;
    }
  };

  const getSelectedItems = () => {
    const files = fs.files.filter((file) => file.selected);
    const folders = fs.folders.filter((folder) => folder.selected);
    return { files, folders };
  };

  /**
   * Returns two objects with the ids for the selected items as keys
   *
   * @returns {{fileIds: {}, folderIds: {}}}
   */
  const getSelectedItemsIds = () => {
    const folderIds = selections.folders.reduce(
      (array, value) => ({ ...array, [value.uuid]: true }),
      {}
    );

    const fileIds = selections.files.reduce(
      (array, value) => ({ ...array, [value.uuid]: true }),
      {}
    );

    return { fileIds, folderIds };
  };

  useEffect(() => {
    if (!fs.isLoading) {
      setSelections(getSelectedItems());
    }
  }, [fs]);

  // TODO: use a hook here to avoid calling this twice
  const onlyOneSelected = () =>
    Object.keys(selections).length &&
    [...selections.files, ...selections.folders].length === 1;

  // TODO: use a hook here to avoid calling this twice
  const anySelected = () =>
    Object.keys(selections).length &&
    [...selections.files, ...selections.folders].length >= 1;

  return fs.isLoading ? null : (
    <PageHeaderControls className="PageHeader" color={controlPageHeader_c}>
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
      <ActionIconWrapper
        onClick={(e) => handleClick(e, iconActionType.DELETE)}
        enabled={anySelected()}
      >
        <TrashIcon
          width={"20px"}
          height={"20px"}
          color={anySelected() ? "white" : "grey"}
        />
      </ActionIconWrapper>
      <ActionIconWrapper
        onClick={(e) => handleClick(e, iconActionType.EDIT)}
        enabled={onlyOneSelected()}
      >
        <EditIcon
          width={"20px"}
          height={"20px"}
          color={onlyOneSelected() ? "white" : "grey"}
        />
      </ActionIconWrapper>
      <ActionIconWrapper
        onClick={(e) => handleClick(e, iconActionType.MOVE)}
        enabled={anySelected()}
      >
        <MoveIcon
          width={"20px"}
          height={"20px"}
          color={anySelected() ? "white" : "grey"}
        />
      </ActionIconWrapper>

      {showEditFileModal && (
        <FileModalComponent
          hideModal={() => setShowEditFileModal(false)}
          isEditing={true}
          fileName={selections.files.at(0).name}
          date={selections.files.at(0).date}
          uuid={selections.files.at(0).uuid}
        />
      )}
      {showEditFolderModal && (
        <FolderModalComponent
          hideModal={() => setShowEditFolderModal(false)}
          isEditing={true}
          folderName={selections.folders.at(0).name}
          uuid={selections.folders.at(0).uuid}
        />
      )}
    </PageHeaderControls>
  );
};

export default FileSystemControlsComponent;
