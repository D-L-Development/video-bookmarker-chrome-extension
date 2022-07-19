import React from "react";
import PropTypes from "prop-types";
import * as Styled from "./input.styles";
import ClearIcon from "../../../../icons/clear-icon/clear.icon";
import SearchIcon from "../../../../icons/search-icon/search.icon";

const InputComponent = ({ placeholder }) => {
  return (
    <Styled.SearchBoxWrapper className="SearchBoxWrapper">
      <Styled.SearchBox placeholder={placeholder} />
      <Styled.SearchIconWrapper>
        <SearchIcon width="15px" height="15px" color="#9BA0A5" />
      </Styled.SearchIconWrapper>
      <Styled.ClearIconWrapper>
        <ClearIcon width="15px" height="15px" color="white" />
      </Styled.ClearIconWrapper>
    </Styled.SearchBoxWrapper>
  );
};

InputComponent.propTypes = {
  placeholder: PropTypes.string.isRequired,
};

export default InputComponent;
