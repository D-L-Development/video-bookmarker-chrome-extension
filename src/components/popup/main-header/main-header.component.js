import React, { useState } from "react";
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
import { UI_ACTIONS } from "../../../contentScripts/utility";
import PropTypes from "prop-types";
import ExpandIcon from "../../../icons/expand-icon/expand.icon";
import { EXTENSION_NAME } from "../../options/data/extensionDetails";

const iconStyles = {
  width: "18px",
  height: "18px",
  color: "lightgrey",
};

const MainHeaderComponent = ({ closePopup, toggleDrag, isDraggable }) => {
  const [draggable, setDraggable] = useState(isDraggable);

  return (
    <Header>
      <HeaderText>{EXTENSION_NAME}</HeaderText>
      <PopupIconGroup>
        <MainHeaderIconWrapper
          onClick={() => {
            setDraggable(!draggable);
            toggleDrag();
          }}
          title={draggable ? "Dock to the side" : "Allow drag"}
        >
          {draggable ? (
            <ExpandIcon {...iconStyles} />
          ) : (
            <MinusIcon {...iconStyles} />
          )}
        </MainHeaderIconWrapper>
        <MainHeaderIconWrapper
          onClick={() => {
            chrome.runtime.sendMessage({ type: UI_ACTIONS.OPEN_OPTIONS }, null);
          }}
          title="Open settings"
        >
          <CogIcon {...iconStyles} />
        </MainHeaderIconWrapper>

        <CloseIconWrapper onClick={closePopup} title="Hide menu">
          <CloseIcon width={"22px"} height={"22px"} color="lightgrey" />
        </CloseIconWrapper>
      </PopupIconGroup>
    </Header>
  );
};

MainHeaderComponent.propTypes = {
  closePopup: PropTypes.func.isRequired,
  toggleDrag: PropTypes.func.isRequired,
  isDraggable: PropTypes.bool.isRequired,
};

export default MainHeaderComponent;
