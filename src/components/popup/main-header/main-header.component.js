import React from "react";
import {
  CloseIconWrapper,
  Header,
  HeaderText,
  MainHeaderIconWrapper,
  PopupIconGroup,
} from "./main-header.styles";
import MinusIcon from "../../../icons/bookmarks-icons/minus-icon/minus.icon";
import CogIcon from "../../../icons/cog-icon/cog.icon";
import CloseIcon from "../../../icons/close-icon/close.icon";
import { MSG } from "../../../contentScripts/utility";
import PropTypes from "prop-types";

const MainHeaderComponent = ({ closePopup, toggleDrag }) => {
  return (
    <Header>
      <HeaderText>Web Video Bookmarker</HeaderText>
      <PopupIconGroup>
        <MainHeaderIconWrapper onClick={toggleDrag}>
          <MinusIcon width={"20px"} height={"20px"} color={"white"} />
        </MainHeaderIconWrapper>
        <MainHeaderIconWrapper
          onClick={() => {
            chrome.runtime.sendMessage({ type: MSG.OPEN_OPTIONS }, null);
          }}
          title="Open settings"
        >
          <CogIcon width={"20px"} height={"20px"} color={"white"} />
        </MainHeaderIconWrapper>

        <CloseIconWrapper onClick={closePopup} title="Hide menu">
          <CloseIcon width="24px" height="24px" color="white" />
        </CloseIconWrapper>
      </PopupIconGroup>
    </Header>
  );
};

MainHeaderComponent.propTypes = {
  closePopup: PropTypes.func.isRequired,
  toggleDrag: PropTypes.func.isRequired,
};

export default MainHeaderComponent;
