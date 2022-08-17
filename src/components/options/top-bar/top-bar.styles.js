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

// // THIS WILL CHANGE WITH THEME
export const StyledLink = styled(NavLink)`
  width: 10rem;
  height: 2.5rem;
  text-decoration: none;
  font-size: 16px;
  text-align: center;
  font-weight: bold;
  text-shadow: -1px 1px #454545;
  background: #051449; // CHANGE THIS TO THEME LATER
  color: #eeeeee;
  padding: 10px 20px;
  margin: 0 0 7px;
  border: none;
  cursor: pointer;
  outline: none;
  position: relative;
  border-radius: 15px;
  box-shadow: 0 7px #040f35, 0 7px 7px 1px #051449, 0 0 #051449 inset; // CHANGE THIS TO THEME LATER
  transition: box-shadow 0.15s, margin 0.15s;

  &:active {
    margin: 7px 0 0;
    box-shadow: 0 0 #0052E0, 0 0 #2f2f2f, 0 3px 14px #004FD9 inset;
  }

  &.active {
    background: #a52a2a; // CHANGE THIS TO THEME LATER
    box-shadow: 0 7px #781e1e, 0 7px 7px 1px #a52a2a, 0 0 #9c2828 inset; // CHANGE THIS TO THEME LATER
  }

`;
