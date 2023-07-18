import styled from "styled-components";
import { invertColor } from "../../../constants/helper-functions";

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
`;

export const HeaderText = styled.h1`
  text-align: center;
  color: ${({ theme }) => invertColor(theme.primary_c, true)};
  font-size: 0.65em;
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
    fill: ${({ theme }) => invertColor(theme.primary_c, true)};
  }

  &:hover {
    background-color: red;
  }

  .draggable & {
    border-top-right-radius: 1rem;
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
