import React from "react";
import PropTypes from "prop-types";
import { StyledSpeedIcon } from "./speed.icon.styles";

const SpeedIcon = (props) => {
  return (
    <StyledSpeedIcon
      width={props.width}
      height={props.height}
      color={props.color}
    />
  );
};

SpeedIcon.propTypes = {
  width: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
};

export default SpeedIcon;
