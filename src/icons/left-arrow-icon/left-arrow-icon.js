import React from "react";
import PropTypes from "prop-types";
import { StyledLeftArrowIcon } from "./left-arrow.icon.styles";

const LeftArrowIcon = (props) => {
  return (
    <StyledLeftArrowIcon
      width={props.width}
      height={props.height}
      color={props.color}
    />
  );
};

LeftArrowIcon.propTypes = {
  width: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
};

export default LeftArrowIcon;
