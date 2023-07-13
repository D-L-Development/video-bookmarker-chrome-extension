import styled from "styled-components";
import { SketchPicker } from "react-color";

export const ColorSquare = styled.button.attrs(({ color, selected }) => ({
  title: "Select color to edit",
  style: {
    backgroundColor: color,
    outline: selected ? "2px solid red" : "1px solid black",
  },
}))`
  height: 6rem;
  aspect-ratio: 1;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  -webkit-transition: -webkit-filter 150ms ease-in;

  &:hover {
    filter: brightness(1.1);
  }
`;

export const ColorOption = styled.div`
  display: flex;
`;

export const ColorName = styled.span``;

export const ColorsList = styled.div`
  width: 70%;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  padding-left: 1rem;
  justify-content: start;
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
  width: 90%;
  margin-top: 0.5rem;

  &: hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

export const ThemeActionsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 30%;
  align-items: center;
`;

export const ColorPicker = styled(SketchPicker).attrs((props) => ({
  width: "90%",
}))``;
