import React from "react";
import PropTypes from "prop-types";
import { StyledGridViewIcon } from "./grid-view.icon.styles";

const GridViewIcon = (props) => {
  return (
    <StyledGridViewIcon
      width={props.width}
      height={props.height}
      color={props.color}
    />
  );
};

GridViewIcon.propTypes = {
  width: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
};

export default GridViewIcon;
