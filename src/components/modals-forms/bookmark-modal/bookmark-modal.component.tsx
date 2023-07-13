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
import { TextArea } from "./bookmark-modal.styles";
import {
  bookmarksActions,
  useBookmarkDispatchContext,
} from "../../../contexts/bookmarks.context";
import { Settings, SettingsContext } from "../../../contexts/settings.context";
import {
  sendMessageToActiveTab,
  VIDEO_ACTIONS,
} from "../../../contentScripts/utility";

const MAX_TEXT_CHARS = 200;
const MAX_TITLE_CHARS = 40;

export interface BookmarkModalProps {
  title: string;
  text: string;
  timestamp: string;
  isNested: boolean;
  isEditing: boolean;
  hideModal: () => void;
}

const BookmarkModalComponent = (props: BookmarkModalProps) => {
  const dispatch = useBookmarkDispatchContext();
  const settings: Settings = useContext(SettingsContext)!;
  const [title, handleTitleChange, titleError] = useInputState(
    props.title || "",
    MAX_TITLE_CHARS
  );
  const [text, handleTextChange, textError] = useInputState(
    props.text || "",
    MAX_TEXT_CHARS
  );

  const firstInputElem: React.MutableRefObject<null | HTMLInputElement> =
    useRef(null);

  useEffect(() => {
    firstInputElem.current?.focus();
  }, []);

  const handleEnterKeyPress = (
    e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (e.key === "Enter") handleSubmitForm();
  };

  const handleSubmitForm = () => {
    // allow submission if a title is present, and no fields exceeds the char count max
    if (
      title.trim().length &&
      titleError === "" &&
      text.trim().length <= MAX_TEXT_CHARS
    ) {
      if (props.text !== text || props.title !== title) {
        dispatch({
          type: bookmarksActions.ADD,
          payload: {
            timestamp: props.timestamp,
            bookmark: {
              text: text.trim(),
              title: title.trim(),
              isNested: props.isNested,
            },
          },
        }).then();
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
          placeholder={"Bookmark description"}
          name="text"
          id="text"
          value={text}
          onChange={handleTextChange}
          error={textError.indexOf("Exceeds") !== -1}
          onKeyDown={handleEnterKeyPress}
        />
        <SecondaryInputText className="secondaryText">
          {textError.indexOf("Exceeds") !== -1 ? textError : ""}
        </SecondaryInputText>
      </FormSection>
    </ModalComponent>
  );
};

export default BookmarkModalComponent;
