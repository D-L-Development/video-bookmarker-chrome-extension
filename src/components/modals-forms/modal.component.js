import React from "react";
import PropTypes from "prop-types";
import {
  CloseIconWrapper,
  ModalActionButtons,
  ModalBody,
  ModalBodyText,
  ModalButton,
  ModalHeader,
  ModalTitle,
  ModalWrapper,
  StyledModal,
} from "./modal.styles";
import CloseIcon from "../../icons/close-icon/close.icon";

const ModalComponent = (props) => {
  return (
    <ModalWrapper
      onClick={(e) => {
        e.stopPropagation();
        props.onClose();
      }}
    >
      <StyledModal onClick={(e) => e.stopPropagation()}>
        <ModalHeader $modalType={props.type}>
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
        {props.message && <ModalBodyText>{props.message}</ModalBodyText>}
        {/* Children can be embedded here */}
        {props.children && <ModalBody>{props.children}</ModalBody>}
        <ModalActionButtons>
          <ModalButton
            className="modalButton cancel"
            type="button"
            $btnType={"cancel"}
            onClick={(e) => {
              e.stopPropagation();
              props.onClose();
            }}
          >
            {props.closeBtnText}
          </ModalButton>
          {props.onSubmit && (
            <ModalButton
              className="modalButton submit"
              type="button"
              $btnType={"submit"}
              onClick={(e) => {
                e.stopPropagation();
                props.onSubmit();
              }}
            >
              {props.submitBtnText}
            </ModalButton>
          )}
        </ModalActionButtons>
      </StyledModal>
    </ModalWrapper>
  );
};

ModalComponent.propTypes = {
  title: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["alert", "form", "warning"]).isRequired,
  onClose: PropTypes.func,
  onSubmit: PropTypes.func,
  message: PropTypes.string,
  closeBtnText: PropTypes.string,
  submitBtnText: PropTypes.string,
};

export default ModalComponent;
