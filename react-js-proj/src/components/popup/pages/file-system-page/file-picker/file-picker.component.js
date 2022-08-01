import React, { useEffect, useState } from "react";
import {
  CloseIconWrapper,
  ModalActionButtons,
  ModalButton,
  ModalHeader,
  ModalTitle,
  ModalWrapper,
  StyledModal,
} from "../../../../modals-forms/modal.styles";
import CloseIcon from "../../../../../icons/close-icon/close.icon";
import PropTypes from "prop-types";
import { modalTypes } from "../../../../../constants/theme";
import { Rectangle } from "../shared/styles";
import FolderIcon from "../../../../../icons/folder-icon/folder.icon";
import { ScrollableBody } from "./file-picker.styles";
import OutlineArrowIcon from "../../../../../icons/outline-arrow-icon/outline-arrow.icon";
import { ROOT } from "../../../../../hooks/use-file-system-mw.hook";

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

  const renderFolders = () =>
    state.folders.map((folder) => (
      <Rectangle key={folder.uuid} selected={folder.uuid === selectedUuid}>
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

  return (
    <ModalWrapper
      onClick={(e) => {
        e.stopPropagation();
        props.onClose();
      }}
    >
      <StyledModal onClick={(e) => e.stopPropagation()}>
        <ModalHeader $modalType={modalTypes.FORM}>
          <ModalTitle>{props.title}</ModalTitle>
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
