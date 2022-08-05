import React, { useContext, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import ModalComponent from "../modal.component";
import { modalTypes } from "../../../constants/theme";
import {
  FormSection,
  Label,
  SecondaryInputText,
  TextInput,
} from "../modal.styles";
import { useInputState } from "../../../hooks/use-input-state.hook";
import { fsDispatchContext } from "../../../contexts/file-system.context";
import { fsActions } from "../../../reducers/file-system.reducer";

const FolderModalComponent = (props) => {
  const [folderName, handleFolderNameChange, error] = useInputState(
    props.folderName || "",
    15
  );
  const fsDispatch = useContext(fsDispatchContext);
  const firstInputElem = useRef(null);

  useEffect(() => {
    firstInputElem.current.focus();
  }, []);

  const handleEnterKeyPress = (e) => {
    if (e.key === "Enter") handleSubmitForm();
  };

  const handleSubmitForm = () => {
    if (folderName.trim().length && error === "") {
      if (props.isEditing) {
        fsDispatch({
          type: fsActions.EDIT_FOLDER,
          payload: { name: folderName.trim(), uuid: props.uuid },
        });
      } else {
        fsDispatch({
          type: fsActions.ADD_FOLDER,
          payload: { name: folderName.trim() },
        });
      }

      props.hideModal();
    }
  };

  return (
    <ModalComponent
      title={props.isEditing ? "Edit folder" : "Create new folder"}
      type={modalTypes.FORM}
      submitBtnText={props.isEditing ? "Edit" : "Create"}
      closeBtnText={"Cancel"}
      onSubmit={handleSubmitForm}
      onClose={props.hideModal}
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
          ref={firstInputElem}
          onKeyDown={handleEnterKeyPress}
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
  isEditing: PropTypes.bool.isRequired,
  folderName: PropTypes.string,
  uuid: PropTypes.string,
};

export default FolderModalComponent;
