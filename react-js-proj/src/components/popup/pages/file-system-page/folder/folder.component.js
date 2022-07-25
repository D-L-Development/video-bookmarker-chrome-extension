import React, { useContext } from "react";
import PropTypes from "prop-types";
import * as SharedStyles from "../shared/styles";
import FolderIcon from "../../../../../icons/folder-icon/folder.icon";
import { fsDispatchContext } from "../../../../../contexts/file-system.context";
import { fsActions } from "../../../../../reducers/file-system.reducer";

const FolderComponent = ({ name, uuid }) => {
  const fsDispatch = useContext(fsDispatchContext);
  return (
    <SharedStyles.Square
      onClick={() => {
        console.log(`Folder click ${uuid}`);
        fsDispatch({
          type: fsActions.REMOVE_FOLDER,
          payload: {
            uuid,
          },
        });
      }}
    >
      <SharedStyles.StretchContainer>
        <FolderIcon width="100%" height="100%" color="#fec" />
        <SharedStyles.SessionNameText>{name}</SharedStyles.SessionNameText>
      </SharedStyles.StretchContainer>
    </SharedStyles.Square>
  );
};

FolderComponent.propTypes = {
  name: PropTypes.string.isRequired,
  uuid: PropTypes.string.isRequired,
};

export default FolderComponent;
