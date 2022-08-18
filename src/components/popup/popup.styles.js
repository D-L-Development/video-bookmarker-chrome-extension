import styled from "styled-components";

export const StyledPopup = styled.div`
  height: 100%;
  width: 100%;
  background-color: white;
  display: flex;
  flex-direction: column;
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
