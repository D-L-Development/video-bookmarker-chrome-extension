import React from "react";
import PropTypes from "prop-types";
import { StyledPlayPauseIcon } from "./play-pause.icon.styles";

const PlayPauseIcon = (props) => {
  return (
    <StyledPlayPauseIcon
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
};

export default PlayPauseIcon;
