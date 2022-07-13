import React from "react";
import { StyledCloseIcon } from "../../icons/close-icon/close.icon.styles";
import { Header, StyledMainHeader, StyledPopup } from "./popup.styles";

const PopupComponent = () => {
  return (
    <StyledPopup>
      <Header>
        <StyledMainHeader>Header</StyledMainHeader>
        <StyledCloseIcon />
        {/* <span id="backArrowIconWrapper">
          <img
            src="../images/icons/arrow-left-short.svg"
            alt="back arrow icon"
            id="backArrowIcon"
            class="navIcon"
          />
        </span>
        <img
          src="../images/icons/x-lg.svg"
          alt="close icon"
          id="closeIcon"
          class="navIcon"
        /> */}
      </Header>
    </StyledPopup>
  );
};

export default PopupComponent;
