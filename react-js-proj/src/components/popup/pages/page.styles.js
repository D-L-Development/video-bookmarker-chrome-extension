import styled from "styled-components";

export const StyledPage = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export const PageContent = styled.div`
  flex-grow: 1;
  width: 100%;
  overflow-y: scroll;
`;
