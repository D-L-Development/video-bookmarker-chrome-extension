import React from "react";
import PropTypes from "prop-types";
import * as SharedStyles from "../shared/styles";
import FolderIcon from "../../../../../icons/folder-icon/folder.icon";

const FolderComponent = (props) => {
  return (
    <SharedStyles.Square>
      <SharedStyles.StretchContainer>
        <FolderIcon width="100%" height="100%" color="#fec" />
        <SharedStyles.SessionNameText>
          {props.name}
        </SharedStyles.SessionNameText>
      </SharedStyles.StretchContainer>
    </SharedStyles.Square>
  );
};

FolderComponent.propTypes = {
  name: PropTypes.string.isRequired,
};

export default FolderComponent;
