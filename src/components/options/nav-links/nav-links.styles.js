import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { COLORS } from "../top-bar/top-bar.styles";

export const StyledLink = styled(NavLink)`
  color: ${COLORS.GREY};
  font-size: 1rem;
  text-decoration: none;
  border-bottom: 2px solid transparent;

  &.active {
    border-bottom: 2px solid ${COLORS.GREY};
    font-weight: 600;
  }
`;
