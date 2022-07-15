import React from "react";
import PropTypes from "prop-types";
import {
  ClearIconWrapper,
  Content,
  PageHeader,
  SearchBox,
  SearchBoxWrapper,
  SearchIconWrapper,
  StyledViewPager,
} from "./view-pager.styles";
import PageComponent from "../page/page.component";
import SearchIcon from "../../../icons/search-icon/search.icon";
import ClearIcon from "../../../icons/clear-icon/clear.icon";

const ViewPagerComponent = (props) => {
  return (
    <Content>
      <StyledViewPager pageNum={props.pageNum}>
        <PageComponent>
          <PageHeader>
            <SearchBoxWrapper>
              <SearchBox placeholder="Search sessions" />
              <SearchIconWrapper>
                <SearchIcon width="15px" height="15px" color="#9BA0A5" />
              </SearchIconWrapper>
              <ClearIconWrapper>
                <ClearIcon width="15px" height="15px" color="white" />
              </ClearIconWrapper>
            </SearchBoxWrapper>
          </PageHeader>
        </PageComponent>
        <PageComponent>Second</PageComponent>
      </StyledViewPager>
    </Content>
  );
};
ViewPagerComponent.protoType = {
  pageNum: PropTypes.oneOf(["first", "second"]),
};
export default ViewPagerComponent;
