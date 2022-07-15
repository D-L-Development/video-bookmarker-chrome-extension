import React from "react";
import PropTypes from "prop-types";
import { StyledAddCircleIcon } from "./add-circle.icon.styles";

const AddCircleIcon = (props) => {
  return (
    <StyledAddCircleIcon
      width={props.width}
      height={props.height}
      color={props.color}
    />
  );
};

AddCircleIcon.propTypes = {
  width: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
};

export default AddCircleIcon;
