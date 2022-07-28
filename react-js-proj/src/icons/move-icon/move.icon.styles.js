import styled from "styled-components";
import MoveIconComponent from "./move.icon.svg";

export const StyledMoveIcon = styled(MoveIconComponent).attrs((props) => ({
  height: props.height || "24px",
  width: props.width || "24px",
  viewBox: "0 0 24 24",
}))`
  fill: ${(props) => props.color || "white"};
`;
