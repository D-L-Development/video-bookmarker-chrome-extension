import React from "react";
import PropTypes from "prop-types";
import * as SharedStyles from "../shared/styles";
import BookmarksIcon from "../../../../../icons/bookmarks-icon/bookmarks.icon";
import { formatDatePickerStamp } from "../../../../../contentScripts/utility";

const FileComponent = ({ name, uuid, selected, handleClick, grid, date }) => {
  return grid ? (
    <SharedStyles.Square
      id={uuid}
      selected={selected}
      onClick={handleClick}
      title={`Created on ${formatDatePickerStamp(date)}`}
    >
      <SharedStyles.StretchContainer>
        <BookmarksIcon width="100%" height="80%" />
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
        <BookmarksIcon width={"3rem"} height={"3rem"} />
      </SharedStyles.DetailedItemIconWrapper>
      <SharedStyles.DetailedItemName>{name}</SharedStyles.DetailedItemName>
      <SharedStyles.DetailedItemDate>
        {formatDatePickerStamp(date)}
      </SharedStyles.DetailedItemDate>
    </SharedStyles.DetailedViewItem>
  );
};

FileComponent.propTypes = {
  name: PropTypes.string.isRequired,
  grid: PropTypes.bool.isRequired,
};

export default FileComponent;
