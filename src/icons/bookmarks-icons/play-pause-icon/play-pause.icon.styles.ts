import styled from "styled-components";
import PlayIconComponent from "./play.icon.svg";
import PauseIconComponent from "./pause.icon.svg";

export const StyledPlayIcon = styled(PlayIconComponent).attrs((props) => ({
  height: props.height || "24px",
  width: props.width || "24px",
  viewBox: "0 0 24 24",
}))`
  fill: ${(props) => props.color || "white"};
`;

export const StyledPauseIcon = styled(PauseIconComponent).attrs((props) => ({
  height: props.height || "24px",
  width: props.width || "24px",
  viewBox: "0 0 24 24",
}))`
  fill: ${(props) => props.color || "white"};
`;
