import React, { useContext } from "react";
import { StyledPage } from "../page.styles";
import { PageHeader } from "../../view-pager/view-pager.styles";
import * as Styled from "./file-system-page.styles";
import FolderComponent from "./folder/folder.component";
import FileComponent from "./file/file.component";
import InputComponent from "../../shared/input/input.component";
import { FileSystemContext } from "../../../../contexts/file-system.context";

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
  const fs = useContext(FileSystemContext);

  return (
    <StyledPage className="StyledPage">
      <PageHeader className="PageHeader">
        <InputComponent placeholder="Search sessions" />
      </PageHeader>
      <Styled.FileSystemContent className="FileSystemContent">
        {fs &&
          fs.folders.map((folder) => (
            <FolderComponent
              name={folder.name}
              uuid={folder.uuid}
              key={folder.uuid}
            />
          ))}
      </Styled.FileSystemContent>
    </StyledPage>
  );
};

export default FileSystemPageComponent;
