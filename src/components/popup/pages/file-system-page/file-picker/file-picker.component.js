import React, { useContext, useEffect, useState } from "react";
import {
  CloseIconWrapper,
  ModalActionButtons,
  ModalButton,
  ModalHeader,
  ModalWrapper,
  StyledModal,
} from "../../../../modals-forms/modal.styles";
import CloseIcon from "../../../../../icons/close-icon/close.icon";
import PropTypes from "prop-types";
import { modalTypes } from "../../../../../constants/theme";
import { Rectangle } from "../shared/styles";
import FolderIcon from "../../../../../icons/folder-icon/folder.icon";
import {
  FilePickerBackButton,
  FilePickerTitle,
  NoFoldersSign,
  ScrollableBody,
} from "./file-picker.styles";
import OutlineArrowIcon from "../../../../../icons/outline-arrow-icon/outline-arrow.icon";
import { ROOT } from "../../../../../hooks/use-file-system-mw.hook";
import LeftArrowIcon from "../../../../../icons/left-arrow-icon/left-arrow-icon";
import { fsDispatchContext } from "../../../../../contexts/file-system.context";
import { fsActions } from "../../../../../reducers/file-system.reducer";
import { checkChromeLastError } from "../../../../../contentScripts/utility";

const FilePickerComponent = ({ onClose, selections, source }) => {
  const [state, setState] = useState({
    folders: [],
    history: [{ uuid: ROOT, name: "Files", date: null }],
    selectedUuid: null,
    isLoading: true,
  });

  const fsDispatch = useContext(fsDispatchContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storage = await chrome.storage.sync.get(ROOT);
        checkChromeLastError();
        if (storage[ROOT]) {
          const { folders } = storage[ROOT];
          setState({ ...state, folders });
        } else {
          throw new Error("Failed to load file system");
        }
      } catch (e) {
        throw e;
      }
    };

    fetchData();
  }, []);

  const updateSelection = (e) => {
    const { id } = e.currentTarget;
    setState({
      ...state,
      selectedUuid: id !== state.selectedUuid ? id : null,
    });
  };

  const handleFolderClick = (e) => {
    switch (e.detail) {
      case 1:
        updateSelection(e);
        return;
      case 2:
        handleFolderOpen(e);
        return;
    }
  };

  const handleBackBtnClick = async (e) => {
    // if already at the root, don't go back
    if (state.history.length <= 1) return;
    try {
      const destinationId = state.history.at(-2).uuid;
      const storage = await chrome.storage.sync.get(destinationId);

      if (storage[destinationId]) {
        setState({
          ...state,
          folders: storage[destinationId].folders,
          history: state.history.slice(0, -1),
        });
      } else {
        throw new Error("Failed to go back");
      }
    } catch (e) {
      throw e;
    }
  };

  const handleMoveItems = async () => {
    fsDispatch({
      type: fsActions.MOVE,
      payload: {
        source,
        destination: state.selectedUuid || state.history.at(-1).uuid,
        ...selections,
      },
    });
    onClose();
  };

  const handleFolderOpen = async (e) => {
    try {
      const { id } = e.currentTarget;
      const storage = await chrome.storage.sync.get(id);
      const clickedFolder = state.folders.find((folder) => folder.uuid === id);
      if (storage[id] && clickedFolder) {
        setState({
          ...state,
          folders: storage[id].folders,
          history: [...state.history, clickedFolder],
          selectedUuid: null,
        });
      } else {
        throw new Error("Failed to open folder");
      }
    } catch (e) {
      throw e;
    }
  };

  const renderFolders = () => {
    const folders = [];
    state.folders.forEach((folder) => {
      if (!selections.folderIds.hasOwnProperty(folder.uuid)) {
        folders.push(
          <Rectangle
            onClick={handleFolderClick}
            key={folder.uuid}
            id={folder.uuid}
            selected={folder.uuid === state.selectedUuid}
          >
            <FolderIcon width={"20px"} height={"20px"} />
            <span>{folder.name}</span>
            <OutlineArrowIcon
              width={"20px"}
              height={"20px"}
              color={"grey"}
              direction={"right"}
            />
          </Rectangle>
        );
      }
    });

    return folders.length ? (
      folders
    ) : (
      <NoFoldersSign>Empty directory</NoFoldersSign>
    );
  };

  return (
    <ModalWrapper
      onClick={(e) => {
        e.stopPropagation();
        onClose();
      }}
    >
      <StyledModal onClick={(e) => e.stopPropagation()}>
        <ModalHeader $modalType={modalTypes.FORM}>
          <FilePickerBackButton
            enabled={state.history.length > 1}
            onClick={handleBackBtnClick}
          >
            <LeftArrowIcon
              width={"18px"}
              height={"18px"}
              color={state.history.length > 1 ? "white" : "grey"}
            />
          </FilePickerBackButton>
          <FilePickerTitle>{state.history.at(-1).name}</FilePickerTitle>
          <CloseIconWrapper
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
          >
            <CloseIcon width={"24px"} height={"24px"} color={"white"} />
          </CloseIconWrapper>
        </ModalHeader>
        <ScrollableBody>{renderFolders()}</ScrollableBody>
        <ModalActionButtons>
          <ModalButton
            className="modalButton submit"
            type="button"
            $btnType={"submit"}
            disabled={
              state.selectedUuid === source ||
              (!state.selectedUuid && source === state.history.at(-1).uuid)
            }
            onClick={(e) => {
              e.stopPropagation();
              handleMoveItems();
            }}
          >
            {state.selectedUuid ? "MOVE" : "MOVE HERE"}
          </ModalButton>
        </ModalActionButtons>
      </StyledModal>
    </ModalWrapper>
  );
};

FilePickerComponent.propTypes = {
  onClose: PropTypes.func.isRequired,
  selections: PropTypes.object.isRequired,
};

export default FilePickerComponent;
