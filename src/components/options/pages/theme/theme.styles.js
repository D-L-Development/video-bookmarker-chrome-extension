import styled from "styled-components";

export const ColorCircle = styled.button.attrs(({ color, selected }) => ({
  style: {
    backgroundColor: color,
    outline: selected ? "2px solid red" : "1px solid black",
  },
}))`
  width: 2rem;
  height: 2rem;
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
export const ThemePickerContainer = styled.div`
  display: flex;
  padding: 2rem;
  align-items: start;
`;

export const ThemeSubmitButton = styled.button`
  outline: none;
  border: none;
  border-radius: 0.4rem;
  padding: 1rem 2rem;
  cursor: pointer;
  transition: 150ms;

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;
