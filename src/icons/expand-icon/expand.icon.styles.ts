import styled from "styled-components";
import ExpandIconComponent from "./expand.icon.svg";

export const StyledExpandIcon = styled(ExpandIconComponent).attrs((props) => ({
  height: props.height || "24px",
  width: props.width || "24px",
  viewBox: "0 0 24 24",
}))`
  fill: ${(props) => props.color || "white"};
`;
