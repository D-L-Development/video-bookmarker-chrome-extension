import React from "react";
import PropTypes from "prop-types";
import * as SharedStyles from "../shared/styles";
import BookmarksIcon from "../../../../../icons/bookmarks-icon/bookmarks.icon";
import { file_c } from "../../../../../constants/theme";
const FileComponent = (props) => {
  return (
    <SharedStyles.Square>
      <SharedStyles.StretchContainer>
        <BookmarksIcon width="100%" height="90%" color={file_c} />
        <SharedStyles.SessionNameText>
          {props.name}
        </SharedStyles.SessionNameText>
      </SharedStyles.StretchContainer>
    </SharedStyles.Square>
  );
};

FileComponent.propTypes = {
  name: PropTypes.string.isRequired,
};

export default FileComponent;
