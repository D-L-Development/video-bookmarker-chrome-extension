import React from "react";
import PropTypes from "prop-types";
import { StyledSkipIcon } from "./skip.icon.styles";

const SkipIcon = (props) => {
  return (
    <StyledSkipIcon
      width={props.width}
      height={props.height}
      color={props.color}
      direction={props.direction}
    />
  );
};

SkipIcon.propTypes = {
  width: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  direction: PropTypes.oneOf(["right", "left"]).isRequired,
};

export default SkipIcon;
