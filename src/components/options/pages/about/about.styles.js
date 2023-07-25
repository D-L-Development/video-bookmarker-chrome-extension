import styled from "styled-components";
import { COLORS } from "../../top-bar/top-bar.styles";

export const PortfolioLink = styled.a`
  color: ${COLORS.TEXT_LIGHT};
  text-decoration: none;
  font-weight: 600;
  border-bottom: 1px solid transparent;
  transition: border-bottom-color 150ms;

  ::before {
    content: "🔗";
  }

  :hover {
    border-bottom: 1px solid;
  }
`;
