import styled from "styled-components";
import CloseIconComponent from "./close.icon.svg";

export const StyledCloseIcon = styled(CloseIconComponent).attrs((props) => ({
  height: props.height || "24px",
  width: props.width || "24px",
  viewport: "0 0 24 24",
}))`
  fill: ${(props) => props.color || "white"};
  cursor: pointer;
`;
