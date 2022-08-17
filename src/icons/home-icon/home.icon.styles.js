import styled from "styled-components";
import HomeIconComponent from "./home.icon.svg";

export const StyledHomeIcon = styled(HomeIconComponent).attrs((props) => ({
    height: props.height || "24px",
    width: props.width || "24px",
    viewBox: "0 0 24 24",
}))`
  fill: ${(props) => props.color || "white"};
  margin-right: 0.3rem;
  margin-top: 0.1rem;
`;