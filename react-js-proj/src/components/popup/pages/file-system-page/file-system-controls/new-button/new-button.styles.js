import styled from "styled-components";
import { bgHoverColor } from "../../../../../../constants/theme";

export const NewButton = styled.div`
  display: flex;
  align-items: center;
  padding: 0.2rem;
  border-radius: 0.2rem;
  cursor: pointer;
  transition: 0.2s;
  margin-left: 0.5rem;

  &:hover {
    background-color: ${bgHoverColor};
  }
`;

export const NewButtonText = styled.span`
  color: white;
  padding-right: 0.2rem;
  padding-left: 0.3rem;
`;
