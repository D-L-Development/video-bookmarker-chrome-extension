import React, { useContext } from "react";
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
import { fsDispatchContext } from "../../../contexts/file-system.context";
import { fsActions } from "../../../reducers/file-system.reducer";

const FolderModalComponent = ({ hideModal, initVal = "" }) => {
  const [folderName, handleFolderNameChange, error] = useInputState(
    initVal,
    15
  );
  const fsDispatch = useContext(fsDispatchContext);
  return (
    <ModalComponent
      title={"Create new folder"}
      type={modalTypes.FORM}
      submitBtnText={"Create"}
      closeBtnText={"Cancel"}
      onSubmit={() => {
        if (folderName.trim().length && error === "") {
          fsDispatch({
            type: fsActions.ADD_FOLDER,
            payload: { name: folderName.trim() },
          });
          hideModal();
        }
      }}
      onClose={hideModal}
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
