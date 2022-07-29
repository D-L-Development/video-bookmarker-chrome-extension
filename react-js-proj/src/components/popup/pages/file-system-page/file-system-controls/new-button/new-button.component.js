import React, { useState } from "react";
import AddCircleIcon from "../../../../../../icons/add-circle-icon/add-circle.icon";
import { NewButton, NewButtonText } from "./new-button.styles";
import OutlineArrowIcon from "../../../../../../icons/outline-arrow-icon/outline-arrow.icon";
import ContextMenuComponent from "../../../../shared/context-menu/context-menu.component";

const NewButtonComponent = (props) => {
  const [showContextMenu, setShowContextMenu] = useState(false);
  return (
    <NewButton onClick={() => setShowContextMenu(true)}>
      <AddCircleIcon width={"18px"} height={"18px"} color={"white"} />
      <NewButtonText>New</NewButtonText>
      <OutlineArrowIcon
        width={"12px"}
        height={"12px"}
        color={"white"}
        direction={"down"}
      />
      {showContextMenu && (
        <ContextMenuComponent close={() => setShowContextMenu(false)}>
          <span>item1</span>
          <span>item2</span>
          <span>item3</span>
        </ContextMenuComponent>
      )}
    </NewButton>
  );
};

export default NewButtonComponent;
