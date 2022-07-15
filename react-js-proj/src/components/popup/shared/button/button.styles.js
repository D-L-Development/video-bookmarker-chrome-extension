import styled from "styled-components";

export const StyledButton = styled.button`
  background-color: ${(props) => props.bgColor};
  color: ${(props) => props.color};
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  padding: 0.4rem 0.5rem;
  border: none;
  transition: 0.15s;
  border-radius: 0.2rem;
  font-size: 0.8rem;
  outline: ${(props) =>
    props.type === "outline" ? `1px solid ${props.bgColor}` : "none"};
  cursor: pointer;

  &:hover {
    background-color: ${(props) =>
      props.type === "outline" ? "transparent" : "grey"};
  }
`;
