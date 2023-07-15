import styled from "styled-components";
import { NavLink } from "react-router-dom";

export const COLORS = {
  PRIMARY: "#3E3971",
  GREY: "#474747",
  TEXT_DARK: "#2D2D2D",
  TEXT_SECONDARY_DARK: "#626262",
  TEXT_LIGHT: "#FFFFFF",
  TEXT_SECONDARY_LIGHT: "#D9D9D9",
};

export const TopBar = styled.div`
  width: 100%;
  height: 4rem;
`;
export const Navigation = styled.nav`
  display: flex;
  align-items: center;
  gap: 1rem;
  height: 100%;
`;

export const ExtensionName = styled.span`
  color: ${COLORS.PRIMARY};
  font-weight: 600;
  font-size: 1rem;
`;

export const StyledLink = styled(NavLink)`
  color: ${COLORS.GREY};
  font-size: 1rem;
  text-decoration: none;
  border-bottom: 1px solid transparent;

  &.active {
    border-bottom: 1px solid ${COLORS.GREY};
    font-weight: 600;
  }
`;
