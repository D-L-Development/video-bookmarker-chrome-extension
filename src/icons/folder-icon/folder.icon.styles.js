import styled from "styled-components";
import FolderIconComponent from "./folder.icon.svg";

export const StyledFolderIcon = styled(FolderIconComponent).attrs((props) => ({
  height: props.height || "24px",
  width: props.width || "24px",
  viewBox: "0 0 24 24",
}))`
  fill: ${({ theme }) => theme.folder_c};
`;
