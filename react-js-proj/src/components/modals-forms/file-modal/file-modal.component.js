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
import { getCurrentDate } from "../../../contentScripts/utility";
import { DatePicker } from "./file-modal.styles";
import { fsActions } from "../../../reducers/file-system.reducer";

const FileModalComponent = (props) => {
  const [fileName, handleFolderNameChange, nameError] = useInputState(
    props.fileName || "",
    15
  );
  const [date, handleDateChange, dateError] = useInputState(
    props.date || getCurrentDate()
  );
  const fsDispatch = useContext(fsDispatchContext);
  const firstInputElem = useRef(null);

  const handleEnterKeyPress = (e) => {
    if (e.key === "Enter") handleSubmitForm();
  };

  useEffect(() => {
    firstInputElem.current.focus();
  }, []);

  const handleSubmitForm = () => {
    if (fileName.trim().length && nameError === "" && date !== "") {
      if (props.isEditing) {
        fsDispatch({
          type: fsActions.EDIT_FILE,
          payload: {
            uuid: props.uuid,
            name: fileName.trim(),
            date,
          },
        });
      } else {
        fsDispatch({
          type: fsActions.ADD_FILE,
          payload: { name: fileName.trim(), date },
        });
      }

      props.hideModal();
    }
  };

  return (
    <ModalComponent
      title={props.isEditing ? "Edit file:" : "Create file:"}
      type={modalTypes.FORM}
      submitBtnText={props.isEditing ? "Edit" : "Create"}
      closeBtnText={"Cancel"}
      onSubmit={handleSubmitForm}
      onClose={props.hideModal}
    >
      <FormSection>
        <Label htmlFor="fileName">Enter the file name:</Label>
        <TextInput
          type="text"
          placeholder={"File name"}
          name="fileName"
          id="fileName"
          value={fileName}
          onChange={handleFolderNameChange}
          nameError={nameError !== ""}
          ref={firstInputElem}
          onKeyDown={handleEnterKeyPress}
        />
        <SecondaryInputText className="secondaryText">
          {nameError}
        </SecondaryInputText>
      </FormSection>
      <FormSection>
        <Label htmlFor="dataPicker">Pick a date:</Label>
        <DatePicker
          id={"dataPicker"}
          value={date}
          onKeyDown={handleEnterKeyPress}
          onChange={handleDateChange}
        />
        <SecondaryInputText>{dateError}</SecondaryInputText>
      </FormSection>
    </ModalComponent>
  );
};

FileModalComponent.propTypes = {
  hideModal: PropTypes.func.isRequired,
  isEditing: PropTypes.bool.isRequired,
  fileName: PropTypes.string,
  date: PropTypes.string,
  uuid: PropTypes.string,
};

export default FileModalComponent;
