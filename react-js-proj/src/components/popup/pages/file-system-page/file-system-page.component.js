import React, { useContext, useRef } from "react";
import { StyledPage } from "../page.styles";
import { PageHeader } from "../../view-pager/view-pager.styles";
import * as Styled from "./file-system-page.styles";
import FolderComponent from "./folder/folder.component";
import FileComponent from "./file/file.component";
import InputComponent from "../../shared/input/input.component";
import {
  FileSystemContext,
  fsDispatchContext,
} from "../../../../contexts/file-system.context";
import { fsActions } from "../../../../reducers/file-system.reducer";

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
  const fsDispatch = useContext(fsDispatchContext);
  const lastSelectedId = useRef(null);

  const handleSelection = (e) => {
    e.stopPropagation();
    const ids = fs.folders.map((folder) => folder.uuid);
    // if CTRL + A, select all
    // check for CTRL | SHIFT keys. NOT both
    // if CTRL is held, toggle selection of item clicked
    // if SHIFT is held, select up to the most recently selected item
    // clicking with no buttons held, ALWAYS selects
    if (e.ctrlKey && e.shiftKey) {
    } else if (e.ctrlKey) {
      // step | toggle the selection
    } else if (e.shiftKey) {
      // step | iterate through the array until you find the id of the last selection
      // step | or the id of the clicked item. Send both id in order
    } else {
      // step | un select all except for the selected
      // step | updated the last selected

      fsDispatch({
        type: fsActions.DESELECT_ALL,
        payload: { uuid: e.currentTarget.id },
      });
    }
  };

  return (
    <StyledPage
      className="StyledPage"
      onClick={() => {
        fsDispatch({ type: fsActions.DESELECT_ALL });
      }}
    >
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
              selected={folder.selected}
              handleClick={handleSelection}
            />
          ))}
      </Styled.FileSystemContent>
    </StyledPage>
  );
};

export default FileSystemPageComponent;
