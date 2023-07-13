import React from "react";
import PropTypes from "prop-types";
import { StyledPlusIcon } from "./plus.icon.styles";

const PlusIcon = (props) => {
  return (
    <StyledPlusIcon
      width={props.width}
      height={props.height}
      color={props.color}
    />
  );
};

PlusIcon.propTypes = {
  width: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
};

export default PlusIcon;
