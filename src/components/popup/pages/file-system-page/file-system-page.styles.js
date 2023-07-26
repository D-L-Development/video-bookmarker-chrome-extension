import styled from "styled-components";
import { PageContent } from "../page.styles";
import { FS_MARGIN_PERCENT } from "./shared/styles";

export const FileSystemContent = styled(PageContent)`
  display: flex;
  height: 90%;
  max-width: ${({ maxWidth }) => maxWidth};
  padding-bottom: ${(props) => (props.grid ? FS_MARGIN_PERCENT : 0)};
  flex-direction: column;
  background-color: ${({ theme }) => theme.body_c};
  border-radius: 1rem;
  box-shadow: ${({ shadow }) =>
    shadow ? "-1px 4px 17px 1px rgb(0 0 0 / 35%)" : ""};
  ${(props) =>
    props.grid &&
    "flex-direction: row;\n  flex-wrap: wrap;\n  justify-content: start;\n  align-content: start;"}
`;
