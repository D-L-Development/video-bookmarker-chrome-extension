import styled from "styled-components";
import AddBookmarkIconComponent from "./add-bookmark.icon.svg";

export const StyledAddBookmarkIcon = styled(AddBookmarkIconComponent).attrs(
  (props) => ({
    height: props.height || "24px",
    width: props.width || "24px",
    viewBox: "0 0 24 24",
  })
)`
  fill: ${(props) => props.color || "white"};
  cursor: pointer;
`;
