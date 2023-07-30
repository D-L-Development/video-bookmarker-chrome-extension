import React from "react";
import PropTypes from "prop-types";
import * as SharedStyles from "../shared/styles";
import FolderIcon from "../../../../../icons/folder-icon/folder.icon";

const FolderComponent = ({ name, uuid, selected, handleClick, grid }) => {
  return grid ? (
    <SharedStyles.Square
      id={uuid}
      selected={selected}
      onClick={handleClick}
      isFolder={true}
    >
      <SharedStyles.StretchContainer>
        <FolderIcon width="100%" height="90%" />
        <SharedStyles.FileSystemItemText>
          {name}
        </SharedStyles.FileSystemItemText>
      </SharedStyles.StretchContainer>
    </SharedStyles.Square>
  ) : (
    <SharedStyles.DetailedViewItem
      id={uuid}
      selected={selected}
      onClick={handleClick}
      isFolder={true}
    >
      <SharedStyles.DetailedItemIconWrapper>
        <FolderIcon width={"3rem"} height={"3rem"} />
      </SharedStyles.DetailedItemIconWrapper>
      <SharedStyles.DetailedItemName>{name}</SharedStyles.DetailedItemName>
    </SharedStyles.DetailedViewItem>
  );
};

FolderComponent.propTypes = {
  name: PropTypes.string.isRequired,
  uuid: PropTypes.string.isRequired,
  selected: PropTypes.bool.isRequired,
};

export default FolderComponent;
