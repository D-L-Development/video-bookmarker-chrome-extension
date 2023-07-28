import styled from "styled-components";
import { getTextColor } from "../../../constants/color-functions";

export const Header = styled.header`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  transition: border-radius 350ms;
  background-color: ${({ theme }) => theme.primary_c};
`;

export const PopupIconGroup = styled.div`
  display: flex;
  height: 100%;
  position: absolute;
  right: 0;
  border-radius: inherit;
`;

export const HeaderText = styled.h1`
  text-align: center;
  color: ${({ theme }) => getTextColor(theme.primary_c)};
  font-size: 10px;
  font-weight: 300;
  margin: 0 auto;
  user-select: none;
`;

export const CloseIconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: 150ms;
  padding-inline: 0.25rem;

  svg {
    fill: ${({ theme }) => getTextColor(theme.primary_c)};
  }

  &:hover {
    background-color: red;
  }

  .draggable & {
    border-top-right-radius: inherit;
  }
`;

export const MainHeaderIconWrapper = styled(CloseIconWrapper)`
  &:hover {
    background-color: transparent;

    & > * {
      fill: #9b9b9b;
      transition: 150ms;
    }
  }
`;
