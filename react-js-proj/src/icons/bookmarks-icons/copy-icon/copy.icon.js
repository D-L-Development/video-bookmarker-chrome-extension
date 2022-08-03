import React from "react";
import PropTypes from "prop-types";
import { StyledCopyIcon } from "./copy.icon.styles";

const CopyIcon = (props) => {
  return (
    <StyledCopyIcon
      width={props.width}
      height={props.height}
      color={props.color}
    />
  );
};

CopyIcon.propTypes = {
  width: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
};

export default CopyIcon;
