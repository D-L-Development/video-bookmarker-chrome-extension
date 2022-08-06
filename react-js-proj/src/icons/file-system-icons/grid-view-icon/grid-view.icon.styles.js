import styled from "styled-components";
import GridViewIconComponent from "./grid-view.icon.svg";

export const StyledGridViewIcon = styled(GridViewIconComponent).attrs(
  (props) => ({
    height: props.height || "24px",
    width: props.width || "24px",
    viewBox: "0 0 24 24",
  })
)`
  fill: ${(props) => props.color || "white"};
`;
