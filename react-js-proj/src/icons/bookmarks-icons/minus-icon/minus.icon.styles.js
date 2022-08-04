import styled from "styled-components";
import MinusIconComponent from "./minus.icon.svg";

export const StyledMinusIcon = styled(MinusIconComponent).attrs((props) => ({
  height: props.height || "24px",
  width: props.width || "24px",
  viewBox: "0 0 24 24",
}))`
  fill: ${(props) => props.color || "white"};
`;
