import React from "react";
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

const FilePickerComponent = (props) => {
  const getFakeData = (amount) => {
    const data = [];
    for (let i = 0; i < amount; i++) {
      data.push(
        <Rectangle key={i} selected={i === 5}>
          <FolderIcon width={"20px"} height={"20px"} color={"grey"} />
          <span>Folder name</span>
          <OutlineArrowIcon
            width={"20px"}
            height={"20px"}
            color={"grey"}
            direction={"right"}
          />
        </Rectangle>
      );
    }

    return data;
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
        <ScrollableBody>{getFakeData(30)}</ScrollableBody>
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
