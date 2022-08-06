import React from "react";
import PropTypes from "prop-types";
import * as SharedStyles from "../shared/styles";
import BookmarksIcon from "../../../../../icons/bookmarks-icon/bookmarks.icon";
import { file_c } from "../../../../../constants/theme";

const FileComponent = ({ name, uuid, selected, handleClick, grid }) => {
  return grid ? (
    <SharedStyles.Square id={uuid} selected={selected} onClick={handleClick}>
      <SharedStyles.StretchContainer>
        <BookmarksIcon width="100%" height="80%" color={file_c} />
        <SharedStyles.FileSystemItemText>
          {name}
        </SharedStyles.FileSystemItemText>
      </SharedStyles.StretchContainer>
    </SharedStyles.Square>
  ) : (
    <span>List item</span>
  );
};

FileComponent.propTypes = {
  name: PropTypes.string.isRequired,
  grid: PropTypes.bool.isRequired,
};

export default FileComponent;
