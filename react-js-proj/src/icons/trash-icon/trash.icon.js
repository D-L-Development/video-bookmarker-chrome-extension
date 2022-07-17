import React from "react";
import PropTypes from "prop-types";
import { StyledTrashIcon } from "./trash.icon.styles";

const TrashIcon = (props) => {
  return (
    <StyledTrashIcon
      width={props.width}
      height={props.height}
      color={props.color}
    />
  );
};

TrashIcon.propTypes = {
  width: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
};

export default TrashIcon;
