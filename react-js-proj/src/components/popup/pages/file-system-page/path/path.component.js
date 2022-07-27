import React, { useContext } from "react";
import { FileSystemContext } from "../../../../../contexts/file-system.context";
import ArrowIcon from "../../../../../icons/arrow-icon/arrow.icon";
import * as Styled from "./path.styles";
import LeftArrowIcon from "../../../../../icons/left-arrow-icon/left-arrow-icon";

const PathComponent = (props) => {
  const fs = useContext(FileSystemContext);
  return fs.isLoading ? null : (
    <Styled.PathWrapper>
      {fs.parent && (
        <>
          <span>
            <LeftArrowIcon width={"24px"} height={"24px"} color={"white"} />
          </span>
          <Styled.Path>{fs.parent.name}</Styled.Path>
          <span>
            <ArrowIcon
              width={"24px"}
              height={"24px"}
              color={"white"}
              direction={"right"}
            />
          </span>
        </>
      )}
      <Styled.Path>{fs.current.name}</Styled.Path>
    </Styled.PathWrapper>
  );
};

export default PathComponent;
