import React, { useContext, useRef } from "react";
import CloseIcon from "../../icons/close-icon/close.icon";
import { MSG, sendMessageToActiveTab } from "../../contentScripts/utility";
import {
  CloseIconWrapper,
  Footer,
  Header,
  StyledMainHeader,
  StyledPopup,
} from "./popup.styles";
import ViewPagerComponent from "./view-pager/view-pager.component";
import { ModalContext } from "../../contexts/modal.context";
import { fsDispatchContext } from "../../contexts/file-system.context";
import { OutsideContext } from "../../contexts/outside-context";

const PopupComponent = () => {
  const { setModalProps, show, hide } = useContext(ModalContext);
  const fsDispatch = useContext(fsDispatchContext);

  const containerRef = useRef(null);
  const handleCloseIconClick = (e) => {
    sendMessageToActiveTab({ action: MSG.TOGGLE }, (response) => {
      if (response.status !== MSG.SUCCESS) {
        alert("Failed to close side menu");
      }
    });
  };

  return (
    <StyledPopup ref={containerRef}>
      {/* Context provider to detect clicks outside of a context menu */}
      <OutsideContext.Provider value={containerRef}>
        <Header>
          <StyledMainHeader></StyledMainHeader>
          <CloseIconWrapper onClick={handleCloseIconClick}>
            <CloseIcon width="24px" height="24px" color="white" />
          </CloseIconWrapper>
        </Header>
        <ViewPagerComponent />
        <Footer></Footer>
      </OutsideContext.Provider>
    </StyledPopup>
  );
};

export default PopupComponent;
