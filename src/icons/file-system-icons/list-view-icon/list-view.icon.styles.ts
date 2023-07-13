import styled from "styled-components";
import ListViewIconComponent from "./list-view.icon.svg";

export const StyledListViewIcon = styled(ListViewIconComponent).attrs(
  (props) => ({
    height: props.height || "24px",
    width: props.width || "24px",
    viewBox: "0 0 24 24",
  })
)`
  fill: ${(props) => props.color || "white"};
`;
