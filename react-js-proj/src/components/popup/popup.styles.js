import styled from "styled-components";
import { primary_c } from "../../constants/theme";
import { StyledButton } from "./shared/button/button.styles";

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
  height: 10%;
  display: flex;
  align-items: center;
  background-color: ${primary_c};
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
export const BackArrowIconWrapper = styled.div`
  position: absolute;
  left: 0;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 10%;
`;

export const Footer = styled.footer`
  height: 3rem;
  width: 100%;
  background-color: ${primary_c};
  display: flex;
  align-items: center;
  margin-top: auto;
`;

export const AddSessionButton = styled(StyledButton).attrs((props) => ({
  type: "filled",
  color: "white",
  bgColor: "teal",
}))`
  margin-left: 0.5rem;
`;

export const AddFolderButton = styled(AddSessionButton)``;
