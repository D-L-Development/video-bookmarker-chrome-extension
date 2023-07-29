import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import * as Styled from "./search-box.styles";
import ClearIcon from "../../../../icons/clear-icon/clear.icon";
import SearchIcon from "../../../../icons/search-icon/search.icon";

const SearchBoxComponent = ({ placeholder, query, setQuery }) => {
  const [showClearIcon, setShowClearIcon] = useState(false);
  const inputElem = useRef(null);

  useEffect(() => {
    if (query.length === 0) setShowClearIcon(false);
  }, [query]);

  const handleChange = (e) => {
    const { value } = e.target;
    setQuery(value);
    setShowClearIcon(value !== "");
  };

  const handleClear = (e) => {
    setQuery("");
    setShowClearIcon(false);
    inputElem.current.focus();
  };

  return (
    <Styled.SearchBoxWrapper className="SearchBoxWrapper">
      <Styled.SearchBox
        placeholder={placeholder}
        value={query}
        onChange={handleChange}
        onKeyDown={(e) => e.stopPropagation()}
        ref={inputElem}
      />
      <Styled.SearchIconWrapper>
        <SearchIcon width="15px" height="15px" color="#9BA0A5" />
      </Styled.SearchIconWrapper>
      {showClearIcon && (
        <Styled.ClearIconWrapper onClick={handleClear}>
          <ClearIcon width="15px" height="15px" color="white" />
        </Styled.ClearIconWrapper>
      )}
    </Styled.SearchBoxWrapper>
  );
};

SearchBoxComponent.propTypes = {
  placeholder: PropTypes.string.isRequired,
};

export default SearchBoxComponent;
