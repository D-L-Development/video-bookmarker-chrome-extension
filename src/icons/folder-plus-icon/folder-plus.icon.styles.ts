import styled from "styled-components";
import FolderPlusIconComponent from "./folder-plus.icon.svg";

export const StyledFolderPlusIcon = styled(FolderPlusIconComponent).attrs(
  (props) => ({
    height: props.height || "24px",
    width: props.width || "24px",
    viewBox: "0 0 24 24",
  })
)`
  fill: ${(props) => props.color || "white"};
  cursor: pointer;
`;
