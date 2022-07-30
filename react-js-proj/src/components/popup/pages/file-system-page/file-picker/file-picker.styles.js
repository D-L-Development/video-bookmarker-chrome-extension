import styled from "styled-components";
import { PageContent } from "../../page.styles";

export const ScrollableBody = styled(PageContent)`
  height: 10rem;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
`;
