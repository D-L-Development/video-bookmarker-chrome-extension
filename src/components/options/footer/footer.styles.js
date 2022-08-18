import styled from "styled-components";

export const FooterContainer = styled.div.attrs(({theme}) => ({
    style: {
        backgroundColor: theme.primary_c,
    },
}))`
  width: 100%;
  height: 100%;
  padding: 1rem;
  box-shadow: 0 -5px 4px rgb(0 0 0 / 25%);
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`;

export const StyledContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const CopyrightInfo = styled.div`
  font-size: 20px;
  font-weight: bold;
  color: #eee;
`;

export const FootLink = styled.a`
  font-size: 20px;
  font-weight: bold;
  color: #eee;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;