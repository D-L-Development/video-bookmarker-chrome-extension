import React, { useContext, useEffect, useRef } from "react";
import { useInputState } from "../../../hooks/use-input-state.hook";
import ModalComponent from "../modal.component";
import { modalTypes } from "../../../constants/theme";
import {
  FormSection,
  Label,
  SecondaryInputText,
  TextInput,
} from "../modal.styles";
import PropTypes from "prop-types";
import { TextArea } from "./bookmark-modal.styles";
import {
  bookmarksActions,
  BookmarksDispatchContext,
} from "../../../contexts/bookmarks.context";
import { SettingsContext } from "../../../contexts/settings.context";
import {
  sendMessageToActiveTab,
  VIDEO_ACTIONS,
} from "../../../contentScripts/utility";

const BookmarkModalComponent = (props) => {
  const dispatch = useContext(BookmarksDispatchContext);
  const settings = useContext(SettingsContext);
  const [title, handleTitleChange, titleError] = useInputState(
    props.title || "",
    15
  );
  const [text, handleTextChange, textError] = useInputState(
    props.text || "",
    200
  );

  const firstInputElem = useRef(null);

  useEffect(() => {
    firstInputElem.current.focus();
  }, []);

  const handleEnterKeyPress = (e) => {
    if (e.key === "Enter") handleSubmitForm();
  };

  const handleSubmitForm = () => {
    if (
      title.trim().length &&
      titleError === "" &&
      text.trim().length &&
      textError === ""
    ) {
      if (props.text !== text || props.title !== title) {
        dispatch({
          type: bookmarksActions.ADD,
          payload: {
            timestamp: props.timestamp,
            bookmark: {
              text,
              title,
              isNested: props.isNested,
            },
          },
        });
      }
      checkIfShouldPlayVideo();
      props.hideModal();
    }
  };

  const checkIfShouldPlayVideo = () => {
    if (!settings.isLoading && settings.resumeAfterAction) {
      sendMessageToActiveTab({ type: VIDEO_ACTIONS.PLAY });
    }
  };

  return (
    <ModalComponent
      title={`${props.isEditing ? "Edit bookmark" : "Create new bookmark"} at ${
        props.timestamp
      }`}
      type={modalTypes.FORM}
      submitBtnText={props.isEditing ? "Edit" : "Create"}
      closeBtnText={"Cancel"}
      onSubmit={handleSubmitForm}
      onClose={() => {
        checkIfShouldPlayVideo();
        props.hideModal();
      }}
    >
      <FormSection>
        <Label htmlFor="title">Enter a title:</Label>
        <TextInput
          type="text"
          placeholder={"Bookmark title"}
          name="title"
          id="title"
          value={title}
          onChange={handleTitleChange}
          error={titleError !== ""}
          ref={firstInputElem}
          onKeyDown={handleEnterKeyPress}
        />
        <SecondaryInputText className="secondaryText">
          {titleError}
        </SecondaryInputText>
      </FormSection>
      <FormSection>
        <Label htmlFor="text">Enter some text:</Label>
        <TextArea
          type="text"
          placeholder={"Bookmark description"}
          name="text"
          id="text"
          value={text}
          onChange={handleTextChange}
          error={textError !== ""}
          onKeyDown={handleEnterKeyPress}
        />
        <SecondaryInputText className="secondaryText">
          {textError}
        </SecondaryInputText>
      </FormSection>
    </ModalComponent>
  );
};

BookmarkModalComponent.propTypes = {
  hideModal: PropTypes.func.isRequired,
  isEditing: PropTypes.bool.isRequired,
  timestamp: PropTypes.string.isRequired,
  // in case editing a bookmark, the props below are needed
  title: PropTypes.string,
  text: PropTypes.string,
  uuid: PropTypes.string,
};

export default BookmarkModalComponent;
