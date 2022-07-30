import React from "react";
import PropTypes from "prop-types";
import * as SharedStyles from "../shared/styles";
import BookmarksIcon from "../../../../../icons/bookmarks-icon/bookmarks.icon";
import { file_c } from "../../../../../constants/theme";

const FileComponent = ({ name, uuid, selected, handleClick }) => {
  return (
    <SharedStyles.Square id={uuid} selected={selected} onClick={handleClick}>
      <SharedStyles.StretchContainer>
        <BookmarksIcon width="100%" height="80%" color={file_c} />
        <SharedStyles.FileSystemItemText>
          {name}
        </SharedStyles.FileSystemItemText>
      </SharedStyles.StretchContainer>
    </SharedStyles.Square>
  );
};

FileComponent.propTypes = {
  name: PropTypes.string.isRequired,
};

export default FileComponent;
