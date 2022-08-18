import styled from "styled-components";

export const StyledPopup = styled.div`
  height: 100%;
  width: 100%;
  background-color: white;
  display: flex;
  flex-direction: column;
`;

export const Header = styled.header`
  position: relative;
  width: 100%;
  height: 2rem;
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
  font-size: 0.65rem;
  margin: 0 auto;
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
`;

export const MainHeaderIconWrapper = styled(CloseIconWrapper)`
  margin-right: 0.2rem;

  &:hover {
    background-color: transparent;

    & > * {
      fill: lightgrey;
    }
  }
`;

export const Footer = styled.footer`
  height: 2rem;
  width: 100%;
  background-color: ${({ theme }) => theme.primary_c};
  display: flex;
  align-items: center;
  margin-top: auto;
  color: grey;
  padding-left: 1rem;
  box-sizing: border-box;
  font-size: 0.65rem;
`;
