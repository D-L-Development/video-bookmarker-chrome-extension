import React from "react";
import PropTypes from "prop-types";
import { StyledCloseIcon } from "./close.icon.styles";

const CloseIcon = (props) => {
  return (
    <StyledCloseIcon
      width={props.width}
      height={props.height}
      color={props.color}
    />
  );
};

CloseIcon.propTypes = {
  width: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
};

export default CloseIcon;
