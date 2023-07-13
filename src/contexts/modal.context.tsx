import React, { createContext, useRef, useState } from "react";
import ModalComponent from "../components/modals-forms/modal.component";
import FolderModalComponent from "../components/modals-forms/folder-modal/folder-modal.component";
import FileModalComponent from "../components/modals-forms/file-modal/file-modal.component";
import BookmarkModalComponent from "../components/modals-forms/bookmark-modal/bookmark-modal.component";

export const modalNames = {
  FILE: "file",
  FOLDER: "folder",
  MESSAGE: "message modal",
  BOOKMARK: "bookmark",
};

export const ModalContext = createContext(null);

export const ModalProvider = (props) => {
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [showFolderModal, setShowFolderModal] = useState(false);
  const [showFileModal, setShowFileModal] = useState(false);
  const [bookmarkModalState, setBookmarkModalState] = useState({
    show: false,
    timestamp: "",
    title: "",
    text: "",
    isNested: false,
    isEditing: false,
  });

  /**
   * Passed down as part of the context value. Enables showing a modal by name
   *
   * @param modalName
   * @param {Object} payload
   */
  const showModal = (modalName = modalNames.MESSAGE, payload = {}) => {
    switch (modalName) {
      case modalNames.FILE:
        setShowFileModal(true);
        break;
      case modalNames.FOLDER:
        setShowFolderModal(true);
        break;
      case modalNames.MESSAGE:
        setShowMessageModal(true);
        break;
      case modalNames.BOOKMARK:
        setBookmarkModalState({
          show: true,
          isEditing: payload?.isEditing,
          timestamp: payload?.timestamp,
          title: payload?.title,
          text: payload?.text,
          isNested: payload?.isNested,
        });
        break;
      default:
        throw new Error(`Modal name ${modalName} not recognized!`);
    }
  };

  const hideMessageModal = () => {
    setShowMessageModal(false);
  };

  const modalProps = useRef({
    onClose: hideMessageModal,
    onSubmit: null,
    title: "Title",
    type: "Alert",
    message: "lorem ipsum",
    closeBtnText: "Close",
    submitBtnText: "Submit",
  });

  /**
   *
   * @param {Object} props
   */
  const setModalProps = (props) => {
    modalProps.current.onClose = props.onClose || hideMessageModal;
    modalProps.current.onSubmit = props.onSubmit || null;
    modalProps.current.title = props.title || "Unset Title";
    modalProps.current.type = props.type || "Alert";
    modalProps.current.message = props.message || "No msg is set";
    modalProps.current.closeBtnText = props.closeBtnText || "Close";
    modalProps.current.submitBtnText = props.submitBtnText || "Submit";
  };

  return (
    <ModalContext.Provider
      value={{ setModalProps, showModal, hideMessageModal }}
    >
      {props.children}
      {showMessageModal && <ModalComponent {...modalProps.current} />}
      {showFolderModal && (
        <FolderModalComponent
          hideModal={() => setShowFolderModal(false)}
          isEditing={false}
        />
      )}
      {showFileModal && (
        <FileModalComponent
          hideModal={() => setShowFileModal(false)}
          isEditing={false}
        />
      )}
      {bookmarkModalState.show && (
        <BookmarkModalComponent
          hideModal={() =>
            setBookmarkModalState({
              show: false,
              isEditing: false,
              timestamp: "",
              title: "",
              text: "",
              isNested: false,
            })
          }
          {...bookmarkModalState}
        />
      )}
    </ModalContext.Provider>
  );
};
