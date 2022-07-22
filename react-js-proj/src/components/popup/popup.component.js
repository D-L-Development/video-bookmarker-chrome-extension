import React, { useContext } from "react";
import LeftArrowIcon from "../../icons/left-arrow-icon/left-arrow-icon";
import CloseIcon from "../../icons/close-icon/close.icon";
import { MSG, sendMessageToActiveTab } from "../../contentScripts/utility";
import {
  AddFolderButton,
  AddSessionButton,
  BackArrowIconWrapper,
  CloseIconWrapper,
  Footer,
  Header,
  StyledMainHeader,
  StyledPopup,
} from "./popup.styles";
import AddCircleIcon from "../../icons/add-circle-icon/add-circle.icon";
import FolderPlusIcon from "../../icons/folder-plus-icon/folder-plus.icon";
import ViewPagerComponent from "./view-pager/view-pager.component";
import { ModalContext } from "../../contexts/modal-context";

const PopupComponent = () => {
  const { setModalProps, show, hide } = useContext(ModalContext);
  const handleCloseIconClick = (e) => {
    sendMessageToActiveTab({ action: MSG.TOGGLE }, (response) => {
      if (response.status !== MSG.SUCCESS) {
        alert("Failed to close side menu");
      }
    });
  };

  const handleNewSessionBtnClick = (e) => {
    console.log("New session click");
  };

  const handleNewFolderBtnClick = (e) => {
    console.log("New folder click");
    setModalProps({
      onClose: () => {
        console.log("Cancel dude");
        hide();
      },
      onSubmit: () => {
        console.log("Submit dude");
        hide();
      },
      title: "This is my custom title",
      type: "Alert",
      message: "Choose what to do!",
      closeBtnText: "Decrement",
      submitBtnText: "Increment",
    });

    show();
  };

  return (
    <StyledPopup>
      <Header>
        <BackArrowIconWrapper>
          <LeftArrowIcon width="24px" height="24px" color="white" />
        </BackArrowIconWrapper>
        <StyledMainHeader>Header</StyledMainHeader>
        <CloseIconWrapper onClick={handleCloseIconClick}>
          <CloseIcon width="24px" height="24px" color="white" />
        </CloseIconWrapper>
      </Header>
      <ViewPagerComponent pageNum="second" />
      <Footer>
        <AddSessionButton onClick={handleNewSessionBtnClick}>
          <AddCircleIcon width="20px" height="20px" color="white" />
          New Session
        </AddSessionButton>
        <AddFolderButton onClick={handleNewFolderBtnClick}>
          <FolderPlusIcon width="20px" height="20px" color="white" />
          Create Folder
        </AddFolderButton>
      </Footer>
    </StyledPopup>
  );
};

export default PopupComponent;
