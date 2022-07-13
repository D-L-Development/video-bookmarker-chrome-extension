import React from "react";
import { StyledPopup } from "./popup.styles";

const PopupComponent = () => {
  return (
    <StyledPopup>
      <header>
        <h1>First Lecture</h1>
        <span id="backArrowIconWrapper">
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
        />
      </header>
    </StyledPopup>
  );
};

export default PopupComponent;
