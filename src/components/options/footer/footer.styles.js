import styled from "styled-components";

export const FooterContainer = styled.footer.attrs(({theme}) => ({
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

`;

export const CopyrightInfo = styled.div`
  font-size: 16px;
  font-weight: bold;
  color: #eee;
`;

export const FootLink = styled.a`
  font-size: 16px;
  font-weight: bold;
  color: #eee;
  text-decoration: none;
  cursor: pointer
`;