import React from "react";
import PropTypes from "prop-types";
import { StyledSearchIcon } from "./search.icon.styles";

const SearchIcon = (props) => {
  return (
    <StyledSearchIcon
      width={props.width}
      height={props.height}
      color={props.color}
    />
  );
};

SearchIcon.propTypes = {
  width: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
};

export default SearchIcon;
