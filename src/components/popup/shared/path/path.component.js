import React, { useContext } from "react";
import PropTypes from "prop-types";
import {
  FileSystemContext,
  fsDispatchContext,
} from "../../../../contexts/file-system.context";
import ArrowIcon from "../../../../icons/arrow-icon/arrow.icon";
import * as Styled from "./path.styles";
import { FolderIconWrapper } from "./path.styles";
import LeftArrowIcon from "../../../../icons/left-arrow-icon/left-arrow-icon";
import FolderIcon from "../../../../icons/folder-icon/folder.icon";
import { fsActions } from "../../../../reducers/file-system.reducer";
import { SECOND } from "../../popup.component";
import { useTheme } from "styled-components";
import { getTextColor } from "../../../../constants/color-functions";

const PathComponent = ({ goBackToFileSystem, pageNum }) => {
  const fs = useContext(FileSystemContext);
  const fsDispatch = useContext(fsDispatchContext);
  const theme = useTheme();

  const textColor = getTextColor(theme.pageHeader_c);

  return fs.isLoading ? null : (
    <Styled.PathWrapper>
      <Styled.BackArrowIconButton
        disabled={fs.history.length <= 1}
        onClick={(e) => {
          if (fs.history.length > 1) {
            e.stopPropagation();
            fsDispatch({ type: fsActions.GO_BACK });
            if (pageNum === SECOND) {
              goBackToFileSystem();
            }
          }
        }}
      >
        <LeftArrowIcon
          width={"15px"}
          height={"15px"}
          color={fs.history.length <= 1 ? "grey" : textColor}
        />
      </Styled.BackArrowIconButton>

      <FolderIconWrapper>
        <FolderIcon width={"20px"} height={"20px"} color={theme.folder_c} />
      </FolderIconWrapper>
      <ArrowIcon
        width={"18px"}
        height={"18px"}
        color={textColor}
        direction={"right"}
      />
      {fs.history.length > 1 && (
        <>
          <Styled.Path color={textColor}>{fs.history.at(-2).name}</Styled.Path>
          <ArrowIcon
            width={"18px"}
            height={"18px"}
            color={textColor}
            direction={"right"}
          />
        </>
      )}
      <Styled.Path color={textColor}>{fs.history.at(-1).name}</Styled.Path>
    </Styled.PathWrapper>
  );
};

PathComponent.propTypes = {
  goBackToFileSystem: PropTypes.func.isRequired,
  pageNum: PropTypes.string.isRequired,
};

export default PathComponent;
