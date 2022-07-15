import React from "react";
import LeftArrowIcon from "../../icons/left-arrow-icon/left-arrow-icon";
import CloseIcon from "../../icons/close-icon/close.icon";
import { sendMessageToActiveTab, MSG } from "../../contentScripts/utility";
import {
  CloseIconWrapper,
  Header,
  StyledMainHeader,
  StyledPopup,
  BackArrowIconWrapper,
  Footer,
} from "./popup.styles";
import Button from "./shared/button/button.component";

const PopupComponent = () => {
  const handleCloseIconClick = (e) => {
    console.log("Clicked");
    sendMessageToActiveTab({ action: MSG.TOGGLE }, (response) => {
      if (response.status === MSG.SUCCESS) {
      }
    });
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
      <Footer>
        <Button type="filled" color="white" bgColor="teal">
          New Session
        </Button>
      </Footer>
    </StyledPopup>
  );
};

export default PopupComponent;
