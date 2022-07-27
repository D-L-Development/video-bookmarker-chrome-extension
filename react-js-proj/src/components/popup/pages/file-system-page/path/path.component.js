import React, { useContext } from "react";
import { FileSystemContext } from "../../../../../contexts/file-system.context";
import ArrowIcon from "../../../../../icons/arrow-icon/arrow.icon";
import * as Styled from "./path.styles";
import LeftArrowIcon from "../../../../../icons/left-arrow-icon/left-arrow-icon";

const PathComponent = (props) => {
  const fs = useContext(FileSystemContext);
  const test = "Game";
  return fs.isLoading ? null : (
    <Styled.PathWrapper>
      {test && (
        <>
          <Styled.BackArrowIconButton>
            <LeftArrowIcon width={"20px"} height={"20px"} color={"white"} />
          </Styled.BackArrowIconButton>
          <Styled.Path>{test}</Styled.Path>
          <Styled.ArrowIconWrapper>
            <ArrowIcon
              width={"18px"}
              height={"18px"}
              color={"white"}
              direction={"right"}
            />
          </Styled.ArrowIconWrapper>
        </>
      )}
      <Styled.Path>{fs.current.name}</Styled.Path>
    </Styled.PathWrapper>
  );
};

export default PathComponent;
