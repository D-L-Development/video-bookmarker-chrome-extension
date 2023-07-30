import styled from "styled-components";
import BookmarksIconComponent from "./bookmarks.icon.svg";

export const StyledBookmarksIcon = styled(BookmarksIconComponent).attrs(
  (props) => ({
    height: props.height || "24px",
    width: props.width || "24px",
    viewBox: "0 0 24 24",
  })
)`
  fill: ${({ theme }) => theme.file_c};
  cursor: pointer;
`;
