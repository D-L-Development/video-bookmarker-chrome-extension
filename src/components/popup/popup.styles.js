import styled from "styled-components";
import { primary_c } from "../../constants/theme";

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

export const StyledMainHeader = styled.h1`
  width: 100%;
  text-align: center;
  color: white;
`;

export const CloseIconWrapper = styled.div`
  position: absolute;
  right: 0.2rem;
  top: 0.2rem;
  display: flex;
`;

export const Footer = styled.footer`
  height: 2rem;
  width: 100%;
  background-color: ${primary_c};
  display: flex;
  align-items: center;
  margin-top: auto;
  color: grey;
  padding-left: 1rem;
  box-sizing: border-box;
  font-size: 0.65rem;
`;
