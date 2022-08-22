import React from "react";
import PropTypes from "prop-types";
import { StyledExpandIcon } from "./expand.icon.styles";

const ExpandIcon = (props) => {
  return (
    <StyledExpandIcon
      width={props.width}
      height={props.height}
      color={props.color}
    />
  );
};

ExpandIcon.propTypes = {
  width: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
};

export default ExpandIcon;
