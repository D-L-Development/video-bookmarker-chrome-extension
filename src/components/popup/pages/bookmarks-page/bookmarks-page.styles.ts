import styled from "styled-components";
import { StyledButton } from "../../shared/button/button.styles";
import { PageContent } from "../page.styles";

export const BookmarksPageContent = styled(PageContent)`
  flex-direction: column;
`;

export const AddBookmarkButton = styled(StyledButton).attrs((props) => ({
  type: "outline",
  bgColor: "teal",
  color: "white",
}))`
  height: 65%;
  font-size: 0.7rem;
  margin-left: 0.5rem;
  white-space: nowrap;
  gap: 0.3rem;
`;

export const CopyTableButton = styled(AddBookmarkButton)``;
