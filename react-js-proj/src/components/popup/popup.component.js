import React, { useContext, useState } from "react";
import CloseIcon from "../../icons/close-icon/close.icon";
import { MSG, sendMessageToActiveTab } from "../../contentScripts/utility";
import {
  AddFolderButton,
  AddSessionButton,
  CloseIconWrapper,
  Footer,
  Header,
  StyledMainHeader,
  StyledPopup,
} from "./popup.styles";
import AddCircleIcon from "../../icons/add-circle-icon/add-circle.icon";
import FolderPlusIcon from "../../icons/folder-plus-icon/folder-plus.icon";
import ViewPagerComponent from "./view-pager/view-pager.component";
import { ModalContext } from "../../contexts/modal.context";
import { fsDispatchContext } from "../../contexts/file-system.context";
import FolderModalComponent from "../modals-forms/folder-modal/folder-modal.component";
import FileModalComponent from "../modals-forms/file-modal/file-modal.component";

const PopupComponent = () => {
  const { setModalProps, show, hide } = useContext(ModalContext);
  const fsDispatch = useContext(fsDispatchContext);
  const [showFolderModal, setShowFolderModal] = useState(false);
  const [showSessionModal, setShowSessionModal] = useState(false);
  const handleCloseIconClick = (e) => {
    sendMessageToActiveTab({ action: MSG.TOGGLE }, (response) => {
      if (response.status !== MSG.SUCCESS) {
        alert("Failed to close side menu");
      }
    });
  };

  const handleNewSessionBtnClick = (e) => {
    setShowSessionModal(true);

    // setModalProps({
    //   onClose: () => {
    //     console.log("Cancel dude");
    //     hide();
    //   },
    //   onSubmit: () => {
    //     console.log("Submit dude");
    //     hide();
    //   },
    //   title: "Simple yes, or no question",
    //   type: modalTypes.FORM,
    //   message: "Choose what to do!",
    //   closeBtnText: "No",
    //   submitBtnText: "Yes",
    // });
    //
    // show();
  };

  const handleNewFolderBtnClick = (e) => {
    setShowFolderModal(true);
  };

  return (
    <StyledPopup>
      <Header>
        <StyledMainHeader></StyledMainHeader>
        <CloseIconWrapper onClick={handleCloseIconClick}>
          <CloseIcon width="24px" height="24px" color="white" />
        </CloseIconWrapper>
      </Header>
      <ViewPagerComponent pageNum="first" />
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

      {showFolderModal && (
        <FolderModalComponent
          hideModal={() => setShowFolderModal(false)}
          isEditing={false}
        />
      )}
      {showSessionModal && (
        <FileModalComponent
          hideModal={() => setShowSessionModal(false)}
          isEditing={false}
        />
      )}
    </StyledPopup>
  );
};

export default PopupComponent;
