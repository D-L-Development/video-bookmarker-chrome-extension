import styled from "styled-components";
import SkipIconComponent from "./skip.icon.svg";

export const StyledSkipIcon = styled(SkipIconComponent).attrs((props) => ({
  height: props.height || "24px",
  width: props.width || "24px",
  viewBox: "0 0 24 24",
}))`
  fill: ${(props) => props.color || "white"};
  transform: rotate(${(props) => (props.direction === "right" ? 0 : 180)}deg);
`;
