import styled from "styled-components";

export const Header = styled.header`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
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
  color: grey;
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

  &:hover {
    background-color: red;
  }

  .draggable & {
    border-top-right-radius: 0.2em;
  }
`;

export const MainHeaderIconWrapper = styled(CloseIconWrapper)`
  margin-right: 0.2em;

  &:hover {
    background-color: transparent;

    & > * {
      fill: #9b9b9b;
      transition: 150ms;
    }
  }
`;
