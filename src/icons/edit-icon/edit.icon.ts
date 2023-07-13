import React from "react";
import PropTypes from "prop-types";
import { StyledEditIcon } from "./edit.icon.js.styles";

const EditIcon = (props) => {
  return (
    <StyledEditIcon
      width={props.width}
      height={props.height}
      color={props.color}
    />
  );
};

EditIcon.propTypes = {
  width: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
};

export default EditIcon;
