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
import { useInputState } from "../../../hooks/useInputState.hook";

const FolderModalComponent = ({ hideModal, initVal = "" }) => {
  const [folderName, handleFolderNameChange, error] = useInputState(
    initVal,
    15
  );
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
          value={folderName}
          onChange={handleFolderNameChange}
          error={error !== ""}
        />
        <SecondaryInputText className="secondaryText">
          {error}
        </SecondaryInputText>
      </FormSection>
    </ModalComponent>
  );
};

FolderModalComponent.propTypes = {
  hideModal: PropTypes.func.isRequired,
};

export default FolderModalComponent;
