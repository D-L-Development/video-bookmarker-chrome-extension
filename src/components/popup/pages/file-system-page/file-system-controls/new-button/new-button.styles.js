import styled, { css } from "styled-components";
import {
  getHoverColor,
  getTextColor,
} from "../../../../../../constants/color-functions";

export const NewButtonWrapper = styled.div`
  margin-left: 0.5rem;
  position: relative;
  ${({ theme }) => {
    const textColor = getTextColor(theme.pageControls_c);
    return css`
      color: ${textColor};

      svg {
        fill: ${textColor};
      }
    `;
  }}
`;

export const NewButton = styled.div`
  display: flex;
  align-items: center;
  padding: 0.2rem;
  border-radius: 0.2rem;
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    background-color: ${({ theme }) => getHoverColor(theme.pageControls_c)};
  }
`;

export const NewButtonText = styled.span`
  padding-right: 0.2rem;
  padding-left: 0.3rem;
`;
