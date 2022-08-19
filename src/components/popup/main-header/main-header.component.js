import React, { useRef } from "react";
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
  const mouseData = useRef({
    mouseUp: true,
    prevX: 0,
    prevY: 0,
    left: 200,
    top: 200,
  });
  const handleCloseIconClick = (e) => {
    sendMessageToActiveTab({ type: MSG.TOGGLE_POPUP });
  };

  const handleCogIconClick = (e) => {
    window.open(OPTIONS_PAGE_URL, "_blank");
  };
  return (
    <Header
      onMouseDown={(e) => {
        mouseData.current = {
          ...mouseData.current,
          mouseUp: false,
          prevX: e.clientX,
          prevY: e.clientY,
        };
      }}
      onMouseUp={(e) => {
        mouseData.current = { ...mouseData.current, mouseUp: true };
      }}
      onMouseMove={(e) => {
        // as long as the mouse is down
        if (mouseData.current.mouseUp) return;
        // calculate new mouse position
        const diffX = mouseData.current.prevX - e.clientX;
        const diffY = mouseData.current.prevY - e.clientY;
        // update prev position
        mouseData.current.prevX = e.clientX;
        mouseData.current.prevY = e.clientY;
        // update actual iframe position
        mouseData.current.left = mouseData.current.left - diffX;
        mouseData.current.top = mouseData.current.top - diffY;

        const payload = {
          left: mouseData.current.left + "px",
          top: mouseData.current.top + "px",
        };

        console.log(payload);

        sendMessageToActiveTab({
          type: MSG.MOVE,
          payload,
        });
      }}
    >
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
