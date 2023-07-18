import styled from "styled-components";

export const COLORS = {
  PRIMARY: "#3E3971",
  PRIMARY_LIGHT: "#625CA8",
  SECONDARY: "#FF5151",
  SECONDARY_LIGHT: "#FF6B6B",
  GREY: "#474747",
  LIGHT_GREY: "#626262",
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
