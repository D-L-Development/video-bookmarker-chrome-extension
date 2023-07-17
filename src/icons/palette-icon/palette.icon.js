import React from "react";
import PropTypes from "prop-types";
import { StyledPaletteIcon } from "./palette.icon.styles";

const PaletteIcon = (props) => {
  return (
    <StyledPaletteIcon
      width={props.width}
      height={props.height}
      color={props.color}
    />
  );
};

PaletteIcon.propTypes = {
  width: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
};

export default PaletteIcon;
