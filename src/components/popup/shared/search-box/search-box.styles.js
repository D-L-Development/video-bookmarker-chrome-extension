import styled, { css } from "styled-components";
import { getHoverColor } from "../../../../constants/color-functions";

export const SearchBox = styled.input.attrs(() => ({
  type: "text",
}))`
  border: none;
  border-radius: 0.4rem;
  width: 100%;
  margin-left: 0.5rem;
  padding: 0 1.4rem;
  height: 70%;
  position: relative;
  background-color: transparent;
  transition: 0.2s;
  font-size: 0.75rem;
`;
export const SearchBoxWrapper = styled.div`
  position: relative;
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
  margin-right: 0.5rem;
  margin-left: auto;

  ${({ theme }) => {
    const [textColor, outline] = getHoverColor(theme.pageHeader_c, [1, 0.3]);
    return css`
      color: ${textColor};

      svg {
        fill: ${outline};
      }

      ${SearchBox} {
        outline: 1px solid ${outline};

        ::placeholder {
          color: ${outline};
        }
      }
    `;
  }}
`;

export const SearchIconWrapper = styled.div`
  position: absolute;
  left: 0.8rem;
  display: flex;
`;

export const ClearIconWrapper = styled.div`
  position: absolute;
  padding: 0 0.3rem;
  display: flex;
  right: 0;
  cursor: pointer;
`;
