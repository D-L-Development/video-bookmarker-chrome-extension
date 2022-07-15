import React from "react";
import LeftArrowIcon from "../../icons/left-arrow-icon/left-arrow-icon";
import CloseIcon from "../../icons/close-icon/close.icon";
import {
  CloseIconWrapper,
  Header,
  StyledMainHeader,
  StyledPopup,
  BackArrowIconWrapper,
} from "./popup.styles";

const PopupComponent = () => {
  return (
    <StyledPopup>
      <Header>
        <BackArrowIconWrapper>
          <LeftArrowIcon width="24px" height="24px" color="white" />
        </BackArrowIconWrapper>
        <StyledMainHeader>Header</StyledMainHeader>
        <CloseIconWrapper>
          <CloseIcon width="24px" height="24px" color="white" />
        </CloseIconWrapper>
      </Header>
    </StyledPopup>
  );
};

export default PopupComponent;
