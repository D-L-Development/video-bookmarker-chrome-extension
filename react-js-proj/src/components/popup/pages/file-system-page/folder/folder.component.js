import React from "react";
import PropTypes from "prop-types";
import * as SharedStyles from "../shared/styles";
import FolderIcon from "../../../../../icons/folder-icon/folder.icon";
import { folder_c } from "../../../../../constants/theme";

const FolderComponent = ({ name, uuid, selected, handleClick, grid }) => {
  return grid ? (
    <SharedStyles.Square id={uuid} selected={selected} onClick={handleClick}>
      <SharedStyles.StretchContainer>
        <FolderIcon width="100%" height="90%" color={folder_c} />
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
    >
      <SharedStyles.DetailedItemIconWrapper>
        <FolderIcon width={"3rem"} height={"3rem"} color={folder_c} />
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
