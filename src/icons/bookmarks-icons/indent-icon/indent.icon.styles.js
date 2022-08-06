import styled from "styled-components";
import IndentIncreaseIconComponent from "./indent-increase.icon.svg";
import IndentDecreaseIconComponent from "./indent-decrease.icon.svg";

export const StyledIndentIncreaseIcon = styled(
  IndentIncreaseIconComponent
).attrs((props) => ({
  height: props.height || "24px",
  width: props.width || "24px",
  viewBox: "0 0 24 24",
}))`
  fill: ${(props) => props.color || "white"};
`;

export const StyledIndentDecreaseIcon = styled(
  IndentDecreaseIconComponent
).attrs((props) => ({
  height: props.height || "24px",
  width: props.width || "24px",
  viewBox: "0 0 24 24",
}))`
  fill: ${(props) => props.color || "white"};
`;
