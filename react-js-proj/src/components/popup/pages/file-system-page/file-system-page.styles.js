import styled from "styled-components";
import { PageContent } from "../page.styles";
import { FS_MARGIN_PERCENT } from "./shared/styles";

export const FileSystemContent = styled(PageContent)`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: start;
  height: 90%;
  align-content: start;
  padding-bottom: ${FS_MARGIN_PERCENT};
`;
