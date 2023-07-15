import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  padding-inline: 1rem;
  max-width: 60rem;
  margin-inline: auto;
  height: 100%;
  display: flex;
  flex-direction: ${({ direction }) => direction || "column"};
  justify-content: ${({ jc }) => jc};
  align-items: ${({ ai }) => ai};
`;
