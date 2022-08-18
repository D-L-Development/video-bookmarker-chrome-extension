import styled from "styled-components";
import GithubIconComponent from "./github.icon.svg";

export const StyledGithubIcon = styled(GithubIconComponent).attrs((props) => ({
    height: props.height || "24px",
    width: props.width || "24px",
    viewBox: "0 0 24 24",
}))`
  fill: ${(props) => props.color || "white"};
  margin-right: 0.3rem;
  margin-top: 0.2rem;
`;