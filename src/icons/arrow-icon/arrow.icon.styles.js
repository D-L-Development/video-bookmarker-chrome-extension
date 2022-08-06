import styled from "styled-components";
import ExpandArrowIconComponent from "./arrow.icon.svg";

export const StyledArrowIcon = styled(ExpandArrowIconComponent).attrs(
  (props) => ({
    width: props.width || "24px",
    height: props.height || "24px",
    viewBox: "0 0 24 24",
  })
)`
  fill: ${(props) => props.color};
  transform: rotate(${(props) => getRotationAngle(props.direction)}deg);
`;

/**
 * Converts a string direction into an the proper angle with accordance to the
 * expand arrow icon. Right marks the 0 degree starting point
 *
 * @param {string} direction - string direction
 * @returns {number}
 */
const getRotationAngle = (direction) => {
  switch (direction) {
    case "right":
      return 0;
    case "down":
      return 90;
    case "left":
      return 180;
    case "up":
      return 270;
    default:
      return 0;
  }
};
