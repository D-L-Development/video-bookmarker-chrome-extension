import React from "react";
import PropTypes from "prop-types";
import { StyledBookmarksIcon } from "./bookmarks.icon.styles";

const BookmarksIcon = (props) => {
  return <StyledBookmarksIcon width={props.width} height={props.height} />;
};

BookmarksIcon.propTypes = {
  width: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
};

export default BookmarksIcon;
