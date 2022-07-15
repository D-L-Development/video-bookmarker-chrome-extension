import styled from "styled-components";
import LeftArrowIconComponent from "./left-arrow-icon.svg";

export const StyledLeftArrowIcon = styled(LeftArrowIconComponent).attrs(
  (props) => ({
    width: props.width || "24px",
    height: props.height || "24px",
  })
)`
  fill: ${(props) => props.color || "white"};
  cursor: pointer;
`;
