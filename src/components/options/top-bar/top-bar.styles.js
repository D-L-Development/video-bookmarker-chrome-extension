import styled from "styled-components";
import {NavLink} from "react-router-dom";


// THIS WILL CHANGE WITH THEME
export const TopBarContainer = styled.div.attrs(({theme}) => ({
    style: {
        backgroundColor: theme.primary_c,
    },
}))`
  width: 100%;
  height: 100%;
  padding-bottom: 1rem;
  box-shadow: 0 5px 4px rgb(0 0 0 / 25%);
`;

export const ExtensionTitle = styled.h1`
  font-size: 72px;
  color: #eee;
  text-align: center;
  text-shadow: 0 5px 4px rgba(0, 0, 0, 0.6);
`;

export const ExtensionSlogan = styled.p`
  font-size: 32px;
  text-align: center;
  color: #eee;
  text-shadow: 0 5px 4px rgba(0, 0, 0, 0.6);
`;

export const Navigation = styled.nav`
  width: auto;
  height: auto;
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-top: 4rem;
`;

// THIS WILL CHANGE WITH THEME
export const NavButton = styled.button`
  background-color: #051449; //CHANGE THIS TO THEME COLOR
  border: solid 2px #000;
  box-shadow: -5px 5px 4px rgb(0 0 0 / 25%);
  border-radius: 15px;
  width: 10rem;
  height: 2.5rem;
`;

export const StyledLink = styled(NavLink)`
  color: white;
  font-size: 1.2rem;
  text-decoration: none;
  border-bottom: 1px solid transparent;

  &.active {
    border-bottom: 1px solid white;
  }
`;
