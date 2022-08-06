import styled from "styled-components";
import { PageContent } from "../page.styles";
import { FS_MARGIN_PERCENT } from "./shared/styles";

export const FileSystemContent = styled(PageContent)`
  display: flex;
  height: 90%;
  padding-bottom: ${FS_MARGIN_PERCENT};
  flex-direction: column;

  ${(props) =>
    props.grid &&
    "flex-direction: row;\n  flex-wrap: wrap;\n  justify-content: start;\n  align-content: start;"}
`;
