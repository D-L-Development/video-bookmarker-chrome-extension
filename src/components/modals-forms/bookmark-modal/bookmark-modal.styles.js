import styled from "styled-components";

export const TextArea = styled.textarea`
  outline: ${(props) => (props.error ? props.theme.error_c : "none")};
  padding: 0.2rem 0.2rem;
  caret-color: black;
  font-size: 0.6rem;
  border-radius: 2px;
  border: 1px solid gray;
  transition: 0.1s;
  font-family: "Roboto", sans-serif;

  &::placeholder {
    color: lightgray;
    font-size: 0.6rem;
  }

  &:focus {
    outline: 0.5px solid ${({ theme }) => theme.inputOutline_c};
    box-shadow: 0 0 5px 1px
      ${(props) =>
        props.error ? props.theme.error_c : props.theme.inputGlow_c};
  }

  resize: vertical;
  max-height: 200px;
  min-height: 50px;
`;
