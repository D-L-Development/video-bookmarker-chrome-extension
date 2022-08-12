import styled from "styled-components";

export const ColorCircle = styled.button`
  background-color: ${(props) => props.color};
  width: 2rem;
  height: 2rem;
  outline: 1px solid black;
  border: none;
  border-radius: 50%;
`;

export const ColorOption = styled.div`
  display: flex;
  border-bottom: 1px solid grey;
`;

export const ColorName = styled.span``;

export const ColorsList = styled.div`
  width: 50%;
`;
