import React, { useContext, useRef } from "react";
import { OutsideContext } from "../../../../contexts/outside-context";
import { useOutside } from "../../../../hooks/use-outside.hook";
import PropTypes from "prop-types";
import { ContextMenu } from "./context-menu.styles";

const ContextMenuComponent = ({ children, close }) => {
  const outerRef = useContext(OutsideContext);
  const contextMenuRef = useRef(null);
  useOutside(outerRef, contextMenuRef, close);

  return <ContextMenu>{children}</ContextMenu>;
};

ContextMenuComponent.propTypes = {
  close: PropTypes.func.isRequired,
};

export default ContextMenuComponent;
