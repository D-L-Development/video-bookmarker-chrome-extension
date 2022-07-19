import React from "react";
import PropTypes from "prop-types";
import { StyledPage } from "../page.styles";
import { PageHeader } from "../../view-pager/view-pager.styles";
import * as Styled from "./file-system-page.styles";
import FolderComponent from "./folder/folder.component";
import FileComponent from "./file/file.component";
import InputComponent from "../../shared/input/input.component";

// TODO: remove this
const getFakeData = () => {
  const data = [];
  for (let i = 0; i < 12; i++) {
    data.push(<FolderComponent key={i} name={"Session name"} />);
  }

  for (let i = 0; i < 11; i++) {
    data.push(<FileComponent key={i + 12} name={"Session name"} />);
  }

  return data;
};

const FileSystemPageComponent = (props) => {
  return (
    <StyledPage className="StyledPage">
      <PageHeader className="PageHeader">
        <InputComponent placeholder="Search sessions" />
      </PageHeader>
      <Styled.FileSystemContent className="FileSystemContent">
        {getFakeData()}
      </Styled.FileSystemContent>
    </StyledPage>
  );
};

export default FileSystemPageComponent;
