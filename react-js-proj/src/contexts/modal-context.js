import React, { createContext, useRef, useState } from "react";
import Modal from "../components/modals-forms/modal/modal";

export const ModalContext = createContext(null);

export const ModalProvider = (props) => {
  const [isShown, setIsShown] = useState(false);

  const show = () => {
    setIsShown(true);
  };
  const hide = () => {
    setIsShown(false);
  };

  const modalProps = useRef({
    onClose: hide,
    onSubmit: null,
    title: "Title",
    type: "Alert",
    message: "lorem ipsum",
    closeBtnText: "Close",
    submitBtnText: "Submit",
  });

  const setModalProps = (props) => {
    modalProps.current.onClose = props.onClose || hide;
    modalProps.current.onSubmit = props.onSubmit || null;
    modalProps.current.title = props.title || "Unset Title";
    modalProps.current.type = props.type || "Alert";
    modalProps.current.message = props.message || "No msg is set";
    modalProps.current.closeBtnText = props.closeBtnText || "Close";
    modalProps.current.submitBtnText = props.submitBtnText || "Submit";
  };

  return (
    <ModalContext.Provider value={{ setModalProps, show, hide }}>
      {props.children}
      {isShown && <Modal {...modalProps.current} />}
    </ModalContext.Provider>
  );
};
