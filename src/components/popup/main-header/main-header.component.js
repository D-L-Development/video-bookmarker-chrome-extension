import React, { useEffect, useRef } from "react";
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

const OPTIONS_PAGE_URL = chrome.runtime.getURL("./options.html");

const MainHeaderComponent = ({ togglePopup, toggleDrag, updatePopupPos }) => {
  const mouseData = useRef({
    mouseUp: true,
    prevX: 0,
    prevY: 0,
    left: 200,
    top: 200,
  });

  const portRef = useRef({
    isLoading: true,
    port: null,
  });

  const handleCogIconClick = (e) => {};

  useEffect(() => {}, []);

  return (
    <Header
    // onMouseDown={(e) => {
    //   mouseData.current = {
    //     ...mouseData.current,
    //     mouseUp: false,
    //     prevX: e.screenX,
    //     prevY: e.screenY,
    //   };
    // }}
    // onMouseUp={(e) => {
    //   mouseData.current = { ...mouseData.current, mouseUp: true };
    // }}
    // onMouseMove={(e) => {
    //   // as long as the mouse is down
    //   if (mouseData.current.mouseUp) return;
    //   // calculate new mouse position
    //   const { screenX, screenY } = e;
    //   const diffX = mouseData.current.prevX - screenX;
    //   const diffY = mouseData.current.prevY - screenY;
    //
    //   // update actual iframe position
    //   mouseData.current.left -= diffX;
    //   mouseData.current.top -= diffY;
    //   // update prev position
    //   mouseData.current.prevX = screenX;
    //   mouseData.current.prevY = screenY;
    //
    //   portRef.current.port.postMessage({
    //     left: mouseData.current.left + "px",
    //     top: mouseData.current.top + "px",
    //   });
    // }}
    >
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

        <CloseIconWrapper onClick={togglePopup} title="Hide menu">
          <CloseIcon width="24px" height="24px" color="white" />
        </CloseIconWrapper>
      </PopupIconGroup>
    </Header>
  );
};

export default MainHeaderComponent;
