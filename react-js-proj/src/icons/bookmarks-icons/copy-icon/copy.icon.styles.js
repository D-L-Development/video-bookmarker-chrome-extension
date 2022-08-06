import styled from "styled-components";
import CopyIconComponent from "./copy.icon.svg";

export const StyledCopyIcon = styled(CopyIconComponent).attrs((props) => ({
  height: props.height || "24px",
  width: props.width || "24px",
  viewBox: "0 0 24 24",
}))`
  fill: ${(props) => props.color || "white"};
`;
