import React from "react";
import PropTypes from "prop-types";
import { StyledFolderPlusIcon } from "./folder-plus.icon.styles";

const FolderPlusIcon = (props) => {
  return (
    <StyledFolderPlusIcon
      width={props.width}
      height={props.height}
      color={props.color}
    />
  );
};

FolderPlusIcon.propTypes = {
  width: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
};

export default FolderPlusIcon;
