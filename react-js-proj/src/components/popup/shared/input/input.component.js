import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import * as Styled from "./input.styles";
import ClearIcon from "../../../../icons/clear-icon/clear.icon";
import SearchIcon from "../../../../icons/search-icon/search.icon";

const InputComponent = ({ placeholder, marginLeft, marginRight }) => {
  const [text, setText] = useState("");
  const [showClearIcon, setShowClearIcon] = useState(false);
  const inputElem = useRef(null);

  const handleChange = (e) => {
    setText(e.target.value);
    setShowClearIcon(e.target.value !== "");
  };

  const handleClear = (e) => {
    setText("");
    setShowClearIcon(false);
    inputElem.current.focus();
  };

  return (
    <Styled.SearchBoxWrapper
      className="SearchBoxWrapper"
      marginLeft={marginLeft}
      marginRight={marginRight}
    >
      <Styled.SearchBox
        placeholder={placeholder}
        value={text}
        onChange={handleChange}
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

InputComponent.propTypes = {
  placeholder: PropTypes.string.isRequired,
  marginLeft: PropTypes.string,
  marginRight: PropTypes.string,
};

export default InputComponent;
