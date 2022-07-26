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
    e.preventDefault();
    const clickedId = e.currentTarget.id;
    // clicking with no buttons held, ALWAYS selects
    if (e.ctrlKey && e.shiftKey) {
      // check for CTRL | SHIFT keys. NOT both
    } else if (e.ctrlKey) {
      // if CTRL is held, toggle selection of item clicked
      fsDispatch({
        type: fsActions.TOGGLE_SELECTION,
        payload: { uuid: clickedId },
      });
    } else if (e.shiftKey) {
      // if SHIFT is held, select up to the most recently selected item

      // if the current is the same as last clicked, then just select it
      if (lastSelectedId.current === clickedId) {
        fsDispatch({
          type: fsActions.DESELECT_ALL,
          payload: { uuid: clickedId },
        });
        return;
      }

      // find the id of the last selection or the id of the clicked item.
      // Send both id's in order depending on index
      let firstId;
      let secondId;
      for (let i = 0; i < fs.folders.length; i++) {
        if (fs.folders[i].uuid === lastSelectedId.current) {
          firstId = lastSelectedId.current;
          secondId = clickedId;
          break;
        } else if (fs.folders[i].uuid === clickedId) {
          firstId = clickedId;
          secondId = lastSelectedId.current;
          break;
        }
      }

      if (firstId && secondId) {
      } else {
        for (let i = 0; i < fs.files.length; i++) {
          if (fs.files[i].uuid === lastSelectedId.current) {
            firstId = lastSelectedId.current;
            secondId = clickedId;
            break;
          } else if (fs.files[i].uuid === clickedId) {
            firstId = clickedId;
            secondId = lastSelectedId.current;
            break;
          }
        }
      }

      fsDispatch({
        type: fsActions.TOGGLE_SELECTION_RANGE,
        payload: { firstId, secondId },
      });
    } else {
      // un select all except for the selected
      // updated the last selected
      lastSelectedId.current = clickedId;
      fsDispatch({
        type: fsActions.DESELECT_ALL,
        payload: { uuid: clickedId },
      });
    }
  };

  return (
    <StyledPage
      className="StyledPage"
      onClick={() => {
        fsDispatch({ type: fsActions.DESELECT_ALL });
      }}
      onKeyDown={(e) => {
        if (e.key === "a" && e.ctrlKey) {
          e.preventDefault();
          fsDispatch({ type: fsActions.SELECT_ALL });
        }
      }}
      tabIndex="0"
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
