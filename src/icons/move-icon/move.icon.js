import React from "react";
import PropTypes from "prop-types";
import { StyledMoveIcon } from "./move.icon.styles";

const MoveIcon = (props) => {
  return (
    <StyledMoveIcon
      width={props.width}
      height={props.height}
      color={props.color}
    />
  );
};

MoveIcon.propTypes = {
  width: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
};

export default MoveIcon;
