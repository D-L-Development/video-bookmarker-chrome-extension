import React from "react";
import PropTypes from "prop-types";
import { StyledMinusIcon } from "./minus.icon.styles";

const MinusIcon = (props) => {
  return (
    <StyledMinusIcon
      width={props.width}
      height={props.height}
      color={props.color}
    />
  );
};

MinusIcon.propTypes = {
  width: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
};

export default MinusIcon;
