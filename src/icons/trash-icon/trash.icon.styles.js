import styled from "styled-components";
import TrashIconComponent from "./trash.icon.svg";

export const StyledTrashIcon = styled(TrashIconComponent).attrs((props) => ({
  height: props.height || "24px",
  width: props.width || "24px",
  viewBox: "0 0 24 24",
}))`
  fill: ${(props) => props.color || "white"};
`;
