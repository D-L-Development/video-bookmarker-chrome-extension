import styled from "styled-components";
import SearchIconComponent from "./search.icon.svg";

export const StyledSearchIcon = styled(SearchIconComponent).attrs((props) => ({
  height: props.height || "24px",
  width: props.width || "24px",
  viewBox: "0 0 24 24",
}))`
  fill: ${(props) => props.color || "white"};
  cursor: pointer;
`;
