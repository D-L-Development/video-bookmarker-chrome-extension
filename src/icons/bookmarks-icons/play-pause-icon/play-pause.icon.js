import React from "react";
import PropTypes from "prop-types";
import { StyledPauseIcon, StyledPlayIcon } from "./play-pause.icon.styles";

const PlayPauseIcon = (props) => {
  return props.type === "pause" ? (
    <StyledPauseIcon
      width={props.width}
      height={props.height}
      color={props.color}
    />
  ) : (
    <StyledPlayIcon
      width={props.width}
      height={props.height}
      color={props.color}
    />
  );
};

PlayPauseIcon.propTypes = {
  width: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["play", "pause"]).isRequired,
};

export default PlayPauseIcon;
