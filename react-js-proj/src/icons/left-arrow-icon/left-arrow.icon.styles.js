import styled from "styled-components";
import LeftArrowIconComponent from "./left-arrow-icon.svg";

export const StyledLeftArrowIcon = styled(LeftArrowIconComponent).attrs(
  (props) => ({
    width: props.width || "24px",
    height: props.height || "24px",
    viewBox: "0 0 24 24",
  })
)`
  cursor: pointer;
  fill: ${(props) => props.color || "white"};
  ${(props) =>
    props.disabled &&
    `
    fill: #a3a3a3;
    cursor: not-allowed;
  `}
`;
