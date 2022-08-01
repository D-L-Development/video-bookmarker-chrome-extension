import React, { useEffect, useState } from "react";
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
  ScrollableBody,
} from "./file-picker.styles";
import OutlineArrowIcon from "../../../../../icons/outline-arrow-icon/outline-arrow.icon";
import { ROOT } from "../../../../../hooks/use-file-system-mw.hook";
import LeftArrowIcon from "../../../../../icons/left-arrow-icon/left-arrow-icon";

const FilePickerComponent = (props) => {
  const [state, setState] = useState({
    folders: [],
    history: [{ uuid: ROOT, name: "Files", date: null }],
    isLoading: true,
  });
  const [selectedUuid, setSelectedUuid] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storage = await chrome.storage.sync.get(ROOT);
        if (chrome.runtime.lastError) {
          console.log(chrome.runtime.lastError);
        }
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

  const handleFolderClick = (e) => {
    switch (e.detail) {
      case 1:
        setSelectedUuid(e.currentTarget.id);
        return;
      case 2:
        handleFolderOpen(e);
        return;
    }
  };

  const handleBackBtnClick = (e) => {};

  const handleFolderOpen = async (e) => {
    try {
      const { id } = e.currentTarget;
      const storage = await chrome.storage.sync.get(id);
      const clickedFolder = state.folders.find((folder) => folder.uuid === id);
      if (storage[id]) {
        setState({
          folders: storage[id].folders,
          history: [...state.history, clickedFolder],
        });
      } else {
        throw new Error("Failed to open folder");
      }
    } catch (e) {
      throw e;
    }
  };

  const renderFolders = () => {
    return state.folders.map((folder) => (
      <Rectangle
        onClick={handleFolderClick}
        key={folder.uuid}
        id={folder.uuid}
        selected={folder.uuid === selectedUuid}
      >
        <FolderIcon width={"20px"} height={"20px"} color={"grey"} />
        <span>{folder.name}</span>
        <OutlineArrowIcon
          width={"20px"}
          height={"20px"}
          color={"grey"}
          direction={"right"}
        />
      </Rectangle>
    ));
  };

  return (
    <ModalWrapper
      onClick={(e) => {
        e.stopPropagation();
        props.onClose();
      }}
    >
      <StyledModal onClick={(e) => e.stopPropagation()}>
        <ModalHeader $modalType={modalTypes.FORM}>
          <FilePickerBackButton
            enabled={state.history.length > 1}
            onClick={handleBackBtnClick}
          >
            <LeftArrowIcon width={"18px"} height={"18px"} color={"white"} />
          </FilePickerBackButton>
          <FilePickerTitle>{props.title}</FilePickerTitle>
          <CloseIconWrapper
            onClick={(e) => {
              e.stopPropagation();
              props.onClose();
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
            onClick={(e) => {
              e.stopPropagation();
              props.onSubmit();
            }}
          >
            Move
          </ModalButton>
        </ModalActionButtons>
      </StyledModal>
    </ModalWrapper>
  );
};

FilePickerComponent.propTypes = {
  title: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default FilePickerComponent;
