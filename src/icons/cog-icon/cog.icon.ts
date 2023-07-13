import React from "react";
import PropTypes from "prop-types";
import { StyledCogIcon } from "./cog.icon.styles";

const CogIcon = (props) => {
  return (
    <StyledCogIcon
      width={props.width}
      height={props.height}
      color={props.color}
    />
  );
};

CogIcon.propTypes = {
  width: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
};

export default CogIcon;
