import styled from "styled-components";
import { PageContent } from "../page.styles";
import { FS_MARGIN_PERCENT } from "./shared/styles";

export const FileSystemContent = styled(PageContent)`
  display: flex;
  height: 90%;
  padding-bottom: ${(props) => (props.grid ? FS_MARGIN_PERCENT : 0)};
  flex-direction: column;
  background-color: ${({ theme }) => theme.body_c};
  border-radius: 0.5rem;

  ${(props) =>
    props.grid &&
    "flex-direction: row;\n  flex-wrap: wrap;\n  justify-content: start;\n  align-content: start;"}
`;
