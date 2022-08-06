import styled from "styled-components";
import AddCircleIconComponent from "./add-circle.icon.svg";

export const StyledAddCircleIcon = styled(AddCircleIconComponent).attrs(
  (props) => ({
    height: props.height || "24px",
    width: props.width || "24px",
    viewBox: `0 0 24 24`,
  })
)`
  fill: ${(props) => props.color || "white"};
  cursor: pointer;
`;
