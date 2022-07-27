import React from "react";
import PropTypes from "prop-types";
import { StyledArrowIcon } from "./arrow.icon.styles";

const ArrowIcon = (props) => {
  return (
    <StyledArrowIcon
      width={props.width}
      height={props.height}
      color={props.color}
      direction={props.direction}
    />
  );
};

ArrowIcon.propTypes = {
  width: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  direction: PropTypes.oneOf(["up", "down", "right", "left"]).isRequired,
};

export default ArrowIcon;
