import React from "react";
import PropTypes from "prop-types";
import { StyledListViewIcon } from "./list-view.icon.styles";

const ListViewIcon = (props) => {
  return (
    <StyledListViewIcon
      width={props.width}
      height={props.height}
      color={props.color}
    />
  );
};

ListViewIcon.propTypes = {
  width: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
};

export default ListViewIcon;
