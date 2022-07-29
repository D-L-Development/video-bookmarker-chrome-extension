import styled from "styled-components";

export const ContextMenu = styled.div`
  position: absolute;
  top: calc(100% + 0.5rem);
  display: flex;
  flex-direction: column;
  width: 6rem;
  background: white;
  border-radius: 0.2rem;
  padding: 0.2rem;
  gap: 0.1rem;
  box-shadow: -2px 2px 5px 0 rgba(0, 0, 0, 0.4);

  & > * {
    padding: 0.2rem;
    cursor: pointer;
    transition: 0.2s;
    border-radius: inherit;

    &:hover {
      background-color: lightgrey;
    }
  }
`;
