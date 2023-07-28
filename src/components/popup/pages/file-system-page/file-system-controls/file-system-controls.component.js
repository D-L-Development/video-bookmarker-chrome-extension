import React, { useContext, useEffect, useState } from "react";
import { modalTypes } from "../../../../../constants/theme";
import { ActionIconWrapper, PageHeaderControls } from "../../page.styles";
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
import { VerticalDivider } from "../../../shared/divider.styles";
import NewButtonComponent from "./new-button/new-button.component";
import FilePickerComponent from "../file-picker/file-picker.component";
import { ModalContext } from "../../../../../contexts/modal.context";
import GridViewIcon from "../../../../../icons/file-system-icons/grid-view-icon/grid-view.icon";
import ListViewIcon from "../../../../../icons/file-system-icons/list-view-icon/list-view.icon";
import { ViewModeSwitch } from "./file-system-controls.styles";
import { EdgeActionIcon } from "../../bookmarks-page/bookmarks-controls/bookmarks-controls.styles";
import {
  ChangeSettingsContext,
  settingsActions,
  SettingsContext,
} from "../../../../../contexts/settings.context";
import { useTheme } from "styled-components";

const iconActionType = {
  DELETE: "delete",
  MOVE: "move",
  EDIT: "edit",
};

const FileSystemControlsComponent = (props) => {
  const fsDispatch = useContext(fsDispatchContext);
  const fs = useContext(FileSystemContext);
  const { setModalProps, showModal, hideMessageModal } =
    useContext(ModalContext);
  const settingsDispatch = useContext(ChangeSettingsContext);
  const settings = useContext(SettingsContext);
  const [selections, setSelections] = useState({});
  const [showEditFileModal, setShowEditFileModal] = useState(false);
  const [showEditFolderModal, setShowEditFolderModal] = useState(false);
  const [showFilePicker, setShowFilePicker] = useState(false);
  const theme = useTheme();

  const handleClick = (e, iconType) => {
    e.stopPropagation();

    switch (iconType) {
      case iconActionType.MOVE:
        if (anySelected()) {
          setShowFilePicker(true);
        }
        break;
      case iconActionType.DELETE:
        if (anySelected()) {
          const { fileIds, folderIds } = getSelectedItemsIds();
          const count = getSelectedItemsCount();
          setModalProps({
            onClose: hideMessageModal,
            onSubmit: () => {
              fsDispatch({
                type: fsActions.REMOVE,
                payload: { fileIds, folderIds },
              });
              hideMessageModal();
            },
            title: "Warning!",
            type: modalTypes.WARNING,
            message: `Are you sure you want to permanently delete ${
              count === 1 ? "this item" : "these items"
            }?`,
            closeBtnText: "No",
            submitBtnText: "Yes",
          });
          showModal();
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

  const getSelectedItemsCount = () =>
    [...selections.files, ...selections.folders].length;

  return fs.isLoading ? null : (
    <PageHeaderControls className="PageHeader">
      <NewButtonComponent />
      <VerticalDivider />

      <ActionIconWrapper
        onClick={(e) => handleClick(e, iconActionType.EDIT)}
        enabled={onlyOneSelected()}
        title={"Edit name"}
        parentColor={theme.pageControls_c}
      >
        <EditIcon width={"20px"} height={"20px"} color={"grey"} />
      </ActionIconWrapper>
      <ActionIconWrapper
        onClick={(e) => handleClick(e, iconActionType.MOVE)}
        enabled={anySelected()}
        title={"Move selected"}
        parentColor={theme.pageControls_c}
      >
        <MoveIcon width={"20px"} height={"20px"} color={"grey"} />
      </ActionIconWrapper>
      <ActionIconWrapper
        onClick={(e) => handleClick(e, iconActionType.DELETE)}
        enabled={anySelected()}
        title={"Delete selected"}
        parentColor={theme.pageControls_c}
      >
        <TrashIcon width={"20px"} height={"20px"} color={"grey"} />
      </ActionIconWrapper>

      {!settings.isLoading && (
        <ViewModeSwitch>
          <EdgeActionIcon
            parentColor={theme.pageControls_c}
            enabled={true}
            selected={settings.isGridView}
            onClick={(e) =>
              !settings.isGridView &&
              settingsDispatch({ type: settingsActions.TOGGLE_VIEW })
            }
            style={{ borderRight: "0.25px solid #a8a8a8" }}
            title={"Grid view layout"}
          >
            <GridViewIcon width={"15px"} height={"15px"} color={"white"} />
          </EdgeActionIcon>
          <EdgeActionIcon
            parentColor={theme.pageControls_c}
            enabled={true}
            selected={!settings.isGridView}
            onClick={(e) =>
              settings.isGridView &&
              settingsDispatch({ type: settingsActions.TOGGLE_VIEW })
            }
            style={{ borderLeft: "0.25px solid #a8a8a8" }}
            title={"Detailed view layout"}
          >
            <ListViewIcon width={"15px"} height={"15px"} color={"white"} />
          </EdgeActionIcon>
        </ViewModeSwitch>
      )}
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
      {showFilePicker && (
        <FilePickerComponent
          source={fs.history.at(-1).uuid}
          onClose={() => setShowFilePicker(false)}
          selections={getSelectedItemsIds()}
        />
      )}
    </PageHeaderControls>
  );
};

export default FileSystemControlsComponent;
