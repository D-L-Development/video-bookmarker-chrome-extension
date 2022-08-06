import React from "react";
import PropTypes from "prop-types";
import { StyledSpinnerIcon } from "./spinner.icon.styles";

const SpinnerIcon = (props) => {
  return (
    <StyledSpinnerIcon
      width={props.width}
      height={props.height}
      color={props.color}
    />
  );
};

SpinnerIcon.propTypes = {
  width: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
};

export default SpinnerIcon;
