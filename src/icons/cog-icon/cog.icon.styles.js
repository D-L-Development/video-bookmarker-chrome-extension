import styled from "styled-components";
import CogIconComponent from "./cog.icon.svg";

export const StyledCogIcon = styled(CogIconComponent).attrs((props) => ({
  height: props.height || "24px",
  width: props.width || "24px",
}))`
  fill: ${(props) => props.color || "white"};
`;
