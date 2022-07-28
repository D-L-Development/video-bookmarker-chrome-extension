import React, { useContext, useEffect, useRef, useState } from "react";
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
import PathComponent from "./path/path.component";
import FileSystemControlsComponent from "./file-system-controls/file-system-controls.component";

const FileSystemPageComponent = (props) => {
  const fs = useContext(FileSystemContext);
  const fsDispatch = useContext(fsDispatchContext);
  const lastSelectedId = useRef(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {}, [searchQuery]);

  const shouldShow = (name) => {
    return name.toLowerCase().indexOf(searchQuery.toLowerCase()) !== -1;
  };

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
      const allFiles = [...fs.folders, ...fs.files];
      for (let i = 0; i < allFiles.length; i++) {
        if (allFiles[i].uuid === lastSelectedId.current) {
          firstId = lastSelectedId.current;
          secondId = clickedId;
          break;
        } else if (allFiles[i].uuid === clickedId) {
          firstId = clickedId;
          secondId = lastSelectedId.current;
          break;
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

  const handleFolderClick = (e) => {
    e.stopPropagation();
    switch (e.detail) {
      case 1:
        handleSelection(e);
        break;
      case 2:
        fsDispatch({
          type: fsActions.OPEN_FOLDER,
          payload: { uuid: e.currentTarget.id },
        });
        break;
      default:
        return;
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
      style={{ userSelect: "none" }}
    >
      <FileSystemControlsComponent />
      <PageHeader className="PageHeader">
        <PathComponent />
        <InputComponent
          placeholder="Search files..."
          marginRight={"0.5rem"}
          marginLeft={"auto"}
          setQuery={setSearchQuery}
        />
      </PageHeader>
      <Styled.FileSystemContent className="FileSystemContent">
        {!fs.isLoading && (
          <>
            {fs.folders.map(
              (folder) =>
                shouldShow(folder.name) && (
                  <FolderComponent
                    name={folder.name}
                    uuid={folder.uuid}
                    key={folder.uuid}
                    selected={folder.selected}
                    handleClick={handleFolderClick}
                  />
                )
            )}
            {fs.files.map(
              (file) =>
                shouldShow(file.name) && (
                  <FileComponent
                    name={file.name}
                    uuid={file.uuid}
                    key={file.uuid}
                    selected={file.selected}
                    handleClick={handleSelection}
                  />
                )
            )}
          </>
        )}
      </Styled.FileSystemContent>
    </StyledPage>
  );
};

export default FileSystemPageComponent;
