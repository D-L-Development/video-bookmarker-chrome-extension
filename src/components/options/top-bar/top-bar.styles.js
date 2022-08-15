import styled from "styled-components";
import { NavLink } from "react-router-dom";

export const Navigation = styled.nav.attrs(({ theme }) => ({
  style: {
    backgroundColor: theme.primary_c,
  },
}))`
  width: 100%;
  height: 4rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  padding-left: 1rem;
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
