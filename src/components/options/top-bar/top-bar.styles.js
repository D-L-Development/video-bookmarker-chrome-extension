import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { main_c } from "../colors";

export const Navigation = styled.nav`
  width: 100%;
  height: 4rem;
  background-color: ${main_c};
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
