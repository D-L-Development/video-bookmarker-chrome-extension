import React from "react";
import PropTypes from "prop-types";
import { StyledAddBookmarkIcon } from "./add-bookmark.icon.styles";

const AddBookmarkIcon = (props) => {
  return (
    <StyledAddBookmarkIcon
      width={props.width}
      height={props.height}
      color={props.color}
    />
  );
};

AddBookmarkIcon.propTypes = {
  width: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
};

export default AddBookmarkIcon;
