import React from "react";
import PropTypes from "prop-types";
import { StyledClearIcon } from "./clear.icon.styles";

const ClearIcon = (props) => {
  return (
    <StyledClearIcon
      width={props.width}
      height={props.height}
      color={props.color}
    />
  );
};

ClearIcon.propTypes = {
  width: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
};

export default ClearIcon;
