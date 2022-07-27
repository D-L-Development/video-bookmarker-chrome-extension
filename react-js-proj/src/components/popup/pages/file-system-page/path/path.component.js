import React, { useContext } from "react";
import { FileSystemContext } from "../../../../../contexts/file-system.context";
import ArrowIcon from "../../../../../icons/arrow-icon/arrow.icon";
import * as Styled from "./path.styles";
import { FolderIconWrapper } from "./path.styles";
import LeftArrowIcon from "../../../../../icons/left-arrow-icon/left-arrow-icon";
import FolderIcon from "../../../../../icons/folder-icon/folder.icon";
import { folder_c } from "../../../../../constants/theme";

const PathComponent = (props) => {
  const fs = useContext(FileSystemContext);

  return fs.isLoading ? null : (
    <Styled.PathWrapper>
      <Styled.BackArrowIconButton>
        <LeftArrowIcon
          width={"20px"}
          height={"20px"}
          color={"white"}
          disabled={fs.parent === null}
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
      {fs.parent && (
        <>
          <Styled.Path>{fs.parent.name}</Styled.Path>
          <ArrowIcon
            width={"18px"}
            height={"18px"}
            color={"white"}
            direction={"right"}
          />
        </>
      )}
      <Styled.Path>{fs.current.name}</Styled.Path>
    </Styled.PathWrapper>
  );
};

export default PathComponent;
