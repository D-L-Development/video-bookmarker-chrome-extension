import styled, { css } from "styled-components";
import { COLORS } from "../../../top-bar/top-bar.styles";

export const ButtonGroup = styled.div`
  display: flex;
  border: 1px solid ${COLORS.PRIMARY};
  width: fit-content;
  border-radius: 0.2rem;
`;

export const ButtonGroupBtn = styled.button`
  width: 5rem;
  aspect-ratio: 1 / 0.5;
  border: none;
  border-right: 1px solid ${COLORS.GREY};
  cursor: pointer;
  transition: all 150ms;

  ${({ active }) =>
    active
      ? css`
          background-color: ${COLORS.PRIMARY};
          color: white;
        `
      : css`
          background-color: transparent;
          color: ${COLORS.GREY};
        `}
  &:last-child {
    border: none;
  }
`;
