import styled from "styled-components";
import SpinnerIconComponent from "./spinner.icon.svg";

export const StyledSpinnerIcon = styled(SpinnerIconComponent).attrs(
  (props) => ({
    height: props.height || "24px",
    width: props.width || "24px",
  })
)`
  circle {
    stroke: ${(props) => props.color || "#c3c3c3"};
  }
`;
