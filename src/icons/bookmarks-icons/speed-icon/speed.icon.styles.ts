import styled from "styled-components";
import SpeedIconComponent from "./speed.icon.svg";

export const StyledSpeedIcon = styled(SpeedIconComponent).attrs((props) => ({
  height: props.height || "24px",
  width: props.width || "24px",
  viewBox: "0 0 24 24",
}))`
  fill: ${(props) => props.color || "white"};
`;
