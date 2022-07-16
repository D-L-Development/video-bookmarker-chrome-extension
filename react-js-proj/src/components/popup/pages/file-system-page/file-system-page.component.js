import React from "react";
import PropTypes from "prop-types";
import { PageContent, StyledPage } from "../page.styles";
import SearchIcon from "../../../../icons/search-icon/search.icon";
import ClearIcon from "../../../../icons/clear-icon/clear.icon";
import { PageHeader } from "../../view-pager/view-pager.styles";
import {
  SearchBoxWrapper,
  SearchBox,
  ClearIconWrapper,
  SearchIconWrapper,
  FileSystemContent,
} from "./file-system-page.styles";
import SessionComponent from "./session/session.component";

// TODO: remove this
const getFakeData = () => {
  const data = [];
  for (let i = 0; i < 30; i++) {
    data.push(
      <SessionComponent key={i}>
        <p>This is some text</p>
      </SessionComponent>
    );
  }

  return data;
};

const FileSystemPageComponent = (props) => {
  return (
    <StyledPage className="StyledPage">
      <PageHeader className="PageHeader">
        <SearchBoxWrapper className="SearchBoxWrapper">
          <SearchBox placeholder="Search sessions" />
          <SearchIconWrapper>
            <SearchIcon width="15px" height="15px" color="#9BA0A5" />
          </SearchIconWrapper>
          <ClearIconWrapper>
            <ClearIcon width="15px" height="15px" color="white" />
          </ClearIconWrapper>
        </SearchBoxWrapper>
      </PageHeader>
      <FileSystemContent className="FileSystemContent">
        {getFakeData()}
      </FileSystemContent>
    </StyledPage>
  );
};

export default FileSystemPageComponent;
