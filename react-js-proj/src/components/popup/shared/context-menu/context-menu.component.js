import React, { useContext, useRef } from "react";
import { OutsideContext } from "../../../../contexts/outside-context";
import { useOutside } from "../../../../hooks/use-outside.hook";
import PropTypes from "prop-types";
import { ContextMenu } from "./context-menu.styles";

const ContextMenuComponent = (props) => {
  const outerRef = useContext(OutsideContext);
  const contextMenuRef = useRef(null);
  useOutside(outerRef, contextMenuRef, props.close);

  return (
    <ContextMenu
      ref={contextMenuRef}
      color={props.color}
      bgColor={props.bgColor}
    >
      {props.children}
    </ContextMenu>
  );
};

ContextMenuComponent.propTypes = {
  close: PropTypes.func.isRequired,
  color: PropTypes.string,
  bgColor: PropTypes.string,
};

export default ContextMenuComponent;
