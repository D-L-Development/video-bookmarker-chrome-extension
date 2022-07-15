import styled from "styled-components";
import { primary_c } from "../../constants/styles";

export const StyledPopup = styled.div`
  height: 100%;
  width: 100%;
  background-color: white;
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
