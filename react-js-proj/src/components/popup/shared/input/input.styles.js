import styled from "styled-components";

export const SearchBoxWrapper = styled.div`
  position: relative;
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
`;

export const SearchBox = styled.input.attrs(() => ({
  type: "text",
}))`
  border: none;
  border-radius: 0.4rem;
  outline: 1px solid gray;
  width: 100%;
  margin-left: 0.5rem;
  padding: 0 1.4rem;
  height: 70%;
  position: relative;
  background-color: transparent;
  transition: 0.2s;
  color: white;
  font-size: 0.75rem;
`;

export const SearchIconWrapper = styled.div`
  position: absolute;
  left: 0.8rem;
  display: flex;
`;

export const ClearIconWrapper = styled.div`
  position: absolute;
  padding: 0 0.3rem;
  display: flex;
  right: 0;
  cursor: pointer;
`;
