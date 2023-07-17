import styled from "styled-components";
import PaletteIconComponent from "./palette.icon.svg";

export const StyledPaletteIcon = styled(PaletteIconComponent).attrs(
  (props) => ({
    height: props.height || "24px",
    width: props.width || "24px",
  })
)`
  fill: ${(props) => props.color || "white"};
`;
