import React from "react";
import PropTypes from "prop-types";
import ModalComponent from "../modal.component";
import { modalTypes } from "../../../constants/theme";
import {
  FormSection,
  Label,
  SecondaryInputText,
  TextInput,
} from "../modal.styles";

const FolderModalComponent = ({ hideModal }) => {
  return (
    <ModalComponent
      title={"Create new folder"}
      type={modalTypes.FORM}
      submitBtnText={"Create"}
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
      <FormSection>
        <Label htmlFor="folderName">Enter the folder name:</Label>
        <TextInput
          type="text"
          placeholder={"Folder name"}
          name="folderName"
          id="folderName"
          error={true}
        />
        <SecondaryInputText className="secondaryText">
          Error above
        </SecondaryInputText>
      </FormSection>
    </ModalComponent>
  );
};

FolderModalComponent.propTypes = {
  hideModal: PropTypes.func.isRequired,
};

export default FolderModalComponent;
