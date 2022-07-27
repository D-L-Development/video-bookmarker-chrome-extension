import React, { useContext } from "react";
import {
  FileSystemContext,
  fsDispatchContext,
} from "../../../../../contexts/file-system.context";
import ArrowIcon from "../../../../../icons/arrow-icon/arrow.icon";
import * as Styled from "./path.styles";
import { FolderIconWrapper } from "./path.styles";
import LeftArrowIcon from "../../../../../icons/left-arrow-icon/left-arrow-icon";
import FolderIcon from "../../../../../icons/folder-icon/folder.icon";
import { folder_c } from "../../../../../constants/theme";
import { fsActions } from "../../../../../reducers/file-system.reducer";

const PathComponent = (props) => {
  const fs = useContext(FileSystemContext);
  const fsDispatch = useContext(fsDispatchContext);

  return fs.isLoading ? null : (
    <Styled.PathWrapper>
      <Styled.BackArrowIconButton
        disabled={fs.history.length <= 1}
        onClick={(e) => {
          if (fs.history.length > 1) {
            e.stopPropagation();
            fsDispatch({ type: fsActions.GO_BACK });
          }
        }}
      >
        <LeftArrowIcon
          width={"20px"}
          height={"20px"}
          color={fs.history.length <= 1 ? "grey" : "white"}
        />
      </Styled.BackArrowIconButton>

      <FolderIconWrapper>
        <FolderIcon width={"20px"} height={"20px"} color={folder_c} />
      </FolderIconWrapper>
      <ArrowIcon
        width={"18px"}
        height={"18px"}
        color={"white"}
        direction={"right"}
      />
      {fs.history.length > 1 && (
        <>
          <Styled.Path>{fs.history.at(-2).name}</Styled.Path>
          <ArrowIcon
            width={"18px"}
            height={"18px"}
            color={"white"}
            direction={"right"}
          />
        </>
      )}
      <Styled.Path>{fs.history.at(-1).name}</Styled.Path>
    </Styled.PathWrapper>
  );
};

export default PathComponent;
