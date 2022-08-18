import React from "react";
import {
  CloseIconWrapper,
  Header,
  HeaderText,
  MainHeaderIconWrapper,
  PopupIconGroup,
} from "./main-header.styles";
import { MSG, sendMessageToActiveTab } from "../../../contentScripts/utility";
import MinusIcon from "../../../icons/bookmarks-icons/minus-icon/minus.icon";
import CogIcon from "../../../icons/cog-icon/cog.icon";
import CloseIcon from "../../../icons/close-icon/close.icon";

const OPTIONS_PAGE_URL = chrome.runtime.getURL("./options.html");

const MainHeaderComponent = (props) => {
  const handleCloseIconClick = (e) => {
    sendMessageToActiveTab({ type: MSG.TOGGLE_POPUP });
  };

  const handleCogIconClick = (e) => {
    window.open(OPTIONS_PAGE_URL, "_blank");
  };
  return (
    <Header>
      <HeaderText>Web Video Bookmarker</HeaderText>
      <PopupIconGroup>
        <MainHeaderIconWrapper
          onClick={() => {
            sendMessageToActiveTab({ type: MSG.TOGGLE_DRAG });
          }}
        >
          <MinusIcon width={"20px"} height={"20px"} color={"white"} />
        </MainHeaderIconWrapper>
        <MainHeaderIconWrapper
          onClick={handleCogIconClick}
          title="Open settings"
        >
          <CogIcon width={"20px"} height={"20px"} color={"white"} />
        </MainHeaderIconWrapper>

        <CloseIconWrapper onClick={handleCloseIconClick} title="Hide menu">
          <CloseIcon width="24px" height="24px" color="white" />
        </CloseIconWrapper>
      </PopupIconGroup>
    </Header>
  );
};

export default MainHeaderComponent;
