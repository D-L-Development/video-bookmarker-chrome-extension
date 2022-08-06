import styled from "styled-components";
import PlusIconComponent from "./plus.icon.svg";

export const StyledPlusIcon = styled(PlusIconComponent).attrs((props) => ({
  height: props.height || "24px",
  width: props.width || "24px",
  viewBox: "0 0 24 24",
}))`
  fill: ${(props) => props.color || "white"};
`;
