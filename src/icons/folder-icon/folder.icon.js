import React from "react";
import PropTypes from "prop-types";
import { StyledFolderIcon } from "./folder.icon.styles";

const FolderIcon = (props) => {
  return <StyledFolderIcon width={props.width} height={props.height} />;
};

FolderIcon.propTypes = {
  width: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
};

export default FolderIcon;
