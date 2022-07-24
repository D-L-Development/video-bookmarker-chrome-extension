import React from "react";
import PropTypes from "prop-types";
import ModalComponent from "../modal.component";

const FolderModalComponent = ({ hideModal }) => {
  return (
    <ModalComponent
      title={"Create new folder"}
      type={"form"}
      submitBtnText={"create"}
      closeBtnText={"Cancel"}
      onSubmit={() => {
        console.log("SUBMIT");
        hideModal();
      }}
      onClose={() => {
        console.log("CLOSE");
        hideModal();
      }}
    >
      <input type={"text"} placeholder={"Folder name"} />
    </ModalComponent>
  );
};

FolderModalComponent.propTypes = {
  hideModal: PropTypes.func.isRequired,
};

export default FolderModalComponent;
