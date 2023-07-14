import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  padding-inline: 1rem;
  max-width: 50rem;
  margin-inline: auto;
  height: 100%;
  display: flex;
  flex-direction: ${({ direction }) => direction || "column"};
  align-items: ${({ direction }) => (direction === "row" ? "" : "center")};
`;
