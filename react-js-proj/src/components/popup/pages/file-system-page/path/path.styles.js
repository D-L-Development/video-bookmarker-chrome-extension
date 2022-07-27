import styled from "styled-components";

export const PathWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
`;

export const Path = styled.span`
  color: #ffffff;

  &:first-of-type {
    margin-left: 0.3rem;
  }
`;

export const BackArrowIconButton = styled.button`
  display: flex;
  width: fit-content;
  height: 65%;
  outline: none;
  border: none;
  background-color: transparent;
  border-right: 1px solid grey;
  align-items: center;
  padding-inline: 0.3rem;
`;

export const ArrowIconWrapper = styled.span`
  display: flex;
`;
