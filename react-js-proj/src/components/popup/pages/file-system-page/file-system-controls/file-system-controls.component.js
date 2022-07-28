import React, { useContext, useEffect, useState } from "react";
import { controlPageHeader_c } from "../../../../../constants/theme";
import {
  ActionIconWrapper,
  PageHeaderControls,
} from "../file-system-page.styles";
import TrashIcon from "../../../../../icons/trash-icon/trash.icon";
import EditIcon from "../../../../../icons/edit-icon/edit.icon";
import MoveIcon from "../../../../../icons/move-icon/move.icon";
import {
  FileSystemContext,
  fsDispatchContext,
} from "../../../../../contexts/file-system.context";
import { fsActions } from "../../../../../reducers/file-system.reducer";

const iconActionType = {
  DELETE: "delete",
  MOVE: "move",
  EDIT: "edit",
};

const FileSystemControlsComponent = (props) => {
  const fsDispatch = useContext(fsDispatchContext);
  const fs = useContext(FileSystemContext);
  const [selections, setSelections] = useState({});

  const handleClick = (e, iconType) => {
    console.log("Icon Click");
    e.stopPropagation();

    switch (iconType) {
      case iconActionType.MOVE:
        break;
      case iconActionType.DELETE:
        break;
      case iconActionType.EDIT:
        if (onlyOneSelected()) {
          fsDispatch({
            type: fsActions.EDIT_FOLDER,
            payload: {
              uuid: selections.foldersIds.at(0),
              name: "CHANGED",
            },
          });
        }
        break;
      default:
        break;
    }
  };

  const getSelectedItems = () => {
    const filesIds = fs.files.reduce((filtered, file) => {
      file.selected && filtered.push(file.uuid);
      return filtered;
    }, []);

    const foldersIds = fs.folders.reduce((filtered, folder) => {
      folder.selected && filtered.push(folder.uuid);
      return filtered;
    }, []);

    return { filesIds, foldersIds };
  };

  useEffect(() => {
    if (!fs.isLoading) {
      setSelections(getSelectedItems());
    }
  }, [fs]);

  // TODO: use a hook here to avoid calling this twice
  const onlyOneSelected = () =>
    Object.keys(selections).length &&
    [...selections.filesIds, ...selections.foldersIds].length === 1;

  // TODO: use a hook here to avoid calling this twice
  const anySelected = () =>
    Object.keys(selections).length &&
    [...selections.filesIds, ...selections.foldersIds].length >= 1;

  return fs.isLoading ? null : (
    <PageHeaderControls className="PageHeader" color={controlPageHeader_c}>
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
    </PageHeaderControls>
  );
};

export default FileSystemControlsComponent;
