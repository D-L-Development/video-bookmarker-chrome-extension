import styled from "styled-components";
import LeftArrowIconComponent from "./left-arrow-icon.svg";

export const StyledLeftArrowIcon = styled(LeftArrowIconComponent).attrs(
  (props) => ({
    width: props.width || "24px",
    height: props.height || "24px",
    viewBox: "0 0 24 24",
  })
)`
  fill: ${(props) => props.color || "white"};
  cursor: pointer;
`;
