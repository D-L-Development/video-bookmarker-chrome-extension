import React from "react";
import PropTypes from "prop-types";
import { StyledBookmarksIcon } from "./bookmarks.icon.styles";
import { IconProps } from "../../models/iconProps";

const BookmarksIcon = (props: IconProps) => {
  return (
    <StyledBookmarksIcon
      width={props.width}
      height={props.height}
      color={props.color}
    />
  );
};

BookmarksIcon.propTypes = {
  width: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
};

export default BookmarksIcon;
