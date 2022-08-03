import styled from "styled-components";
import PlayPauseIconComponent from "./play-pause.icon.svg";

export const StyledPlayPauseIcon = styled(PlayPauseIconComponent).attrs(
  (props) => ({
    height: props.height || "24px",
    width: props.width || "24px",
    viewBox: "0 0 24 24",
  })
)`
  fill: ${(props) => props.color || "white"};
`;
