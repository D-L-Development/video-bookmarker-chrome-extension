import styled from "styled-components";
import { ActionIconWrapper } from "../../page.styles";

export const SpeedIconsGroup = styled.div`
  display: flex;
  outline: 0.5px solid #a2a2a2;
  margin-left: 0.5rem;
  border-radius: 0.2rem;
`;

export const SpeedActionIcon = styled(ActionIconWrapper)`
  &:first-of-type {
    margin: 0;
    border-radius: 0.2rem 0 0 0.2rem;
  }

  &:nth-child(even) {
    border-radius: unset;
    background: #ffffff61;
  }

  &:last-of-type {
    border-radius: 0 0.2rem 0.2rem 0;
  }
`;

export const SpinnerWrapper = styled.div`
  margin-left: auto;
  margin-right: 1rem;
`;
