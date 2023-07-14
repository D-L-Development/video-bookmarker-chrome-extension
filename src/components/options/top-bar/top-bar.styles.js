import styled from "styled-components";
import { NavLink } from "react-router-dom";

export const TopBar = styled.div.attrs(({ theme }) => ({
  style: {
    backgroundColor: theme.primary_c,
  },
}))`
  width: 100%;
  height: 4rem;
`;
export const Navigation = styled.nav`
  display: flex;
  align-items: center;
  gap: 1rem;
  height: 100%;
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
