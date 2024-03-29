import styled, { keyframes } from "styled-components";
import { ActionIconWrapper } from "../../page.styles";

export const SpeedIconsGroup = styled.div`
  display: flex;
  outline: 0.5px solid #a2a2a2;
  margin-left: 0.5rem;
  border-radius: 0.2rem;
`;

export const EdgeActionIcon = styled(ActionIconWrapper)`
  &:first-of-type {
    margin: 0;
    border-radius: 0.2rem 0 0 0.2rem;
  }

  &:nth-child(even):not(:last-of-type) {
    border-radius: unset;
    background: #ffffff61;
  }

  &:last-of-type {
    border-radius: 0 0.2rem 0.2rem 0;
  }

  &&& {
    background-color: ${(props) => props.selected && "rgba(255,255,255,0.5)"};
  }
`;

export const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

export const SpinnerWrapper = styled.div`
  margin-left: auto;
  opacity: 0;
  animation-name: ${fadeIn};
  animation-duration: 100ms;
  animation-timing-function: ease;
  animation-iteration-count: 1;
  animation-delay: 100ms;
  animation-fill-mode: forwards;
`;

export const SpeedText = styled.span`
  color: white;
  margin-left: 0.5rem;
`;
