import React from "react";
import PropTypes from "prop-types";
import {
  StyledIndentIncreaseIcon,
  StyledIndentDecreaseIcon,
} from "./indent.icon.styles";

const IndentIcon = (props) => {
  return props.type === "increase" ? (
    <StyledIndentIncreaseIcon
      width={props.width}
      height={props.height}
      color={props.color}
    />
  ) : (
    <StyledIndentDecreaseIcon
      width={props.width}
      height={props.height}
      color={props.color}
    />
  );
};

IndentIcon.propTypes = {
  width: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["increase", "decrease"]),
};

export default IndentIcon;
