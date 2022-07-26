import React, { useContext, useState } from "react";
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
import { getCurrentDate } from "../../../contentScripts/utility";

const FileModalComponent = (props) => {
  const [fileName, handleFolderNameChange, error] = useInputState(
    props.fileName || "",
    15
  );
  const [date, setDate] = useState(props.date || getCurrentDate());
  const fsDispatch = useContext(fsDispatchContext);
  return (
    <ModalComponent
      title={props.title}
      type={modalTypes.FORM}
      submitBtnText={props.submitBtnText}
      closeBtnText={"Cancel"}
      onSubmit={() => {
        if (fileName.trim().length && error === "" && date !== "") {
          fsDispatch({
            type: fsActions.ADD_FILE,
            payload: { name: fileName.trim(), date },
          });
          props.hideModal();
        }
      }}
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
          error={error !== ""}
        />
        <SecondaryInputText className="secondaryText">
          {error}
        </SecondaryInputText>
      </FormSection>
      <FormSection>
        <Label htmlFor="dataPicker">Pick a date:</Label>
        <input
          id={"dataPicker"}
          type={"date"}
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </FormSection>
    </ModalComponent>
  );
};

FileModalComponent.propTypes = {
  hideModal: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  submitBtnText: PropTypes.string.isRequired,
  fileName: PropTypes.string,
  date: PropTypes.string,
};

export default FileModalComponent;
