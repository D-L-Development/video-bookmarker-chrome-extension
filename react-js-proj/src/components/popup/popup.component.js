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
  AddSessionButton,
} from "./popup.styles";
import Button from "./shared/button/button.component";
import AddCircleIcon from "../../icons/add-circle-icon/add-circle.icon";
import { Content, StyledViewPager } from "./view-pager/view-pager.styles";
import ViewPagerComponent from "./view-pager/view-pager.component";

const PopupComponent = () => {
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
      <ViewPagerComponent pageNum="first" />
      <Footer>
        <AddSessionButton onClick={handleNewSessionBtnClick}>
          <AddCircleIcon width="20px" height="20px" color="white" />
          New Session
        </AddSessionButton>
      </Footer>
    </StyledPopup>
  );
};

export default PopupComponent;
