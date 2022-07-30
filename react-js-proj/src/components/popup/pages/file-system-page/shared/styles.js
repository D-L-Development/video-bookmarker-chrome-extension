import styled from "styled-components";
import { selected_folder_c } from "../../../../../constants/theme";

const DIMEN_PERCENT = "22.5%";
export const FS_MARGIN_PERCENT = "2%";

export const Square = styled.div`
  width: ${DIMEN_PERCENT};
  padding-bottom: ${DIMEN_PERCENT};
  margin-left: ${FS_MARGIN_PERCENT};
  margin-top: ${FS_MARGIN_PERCENT};
  position: relative;
  cursor: pointer;
  transition: 0.1s;

  ${(props) =>
    props.selected &&
    `
    outline: 1px solid #0300ff;
    background-color: rgb(191, 181, 209);
  `}
  &:hover {
    outline: 1px solid rgba(3, 0, 255, 0.76);
    background-color: rgba(191, 181, 209, 0.79);
  }
`;

export const StretchContainer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
`;

export const FileSystemItemText = styled.span`
  position: absolute;
  bottom: 6%;
  font-size: 0.7rem;
  left: 0;
  width: 100%;
  text-align: center;
  margin: 0 auto;
`;

export const Rectangle = styled.div`
  width: 100%;
  padding-block: 0.5rem;
  outline: 1px solid white;
  transition: background-color 150ms ease-in;
  display: flex;
  align-items: center;
  cursor: pointer;

  background-color: ${(props) =>
    props.selected ? selected_folder_c : "white"};
  color: ${(props) => (props.selected ? "white" : "black")};

  &:hover {
    background-color: ${(props) => !props.selected && "lightgrey"};
  }

  & > * {
    margin-left: 0.5rem;
  }

  & > svg:last-of-type {
    margin-left: auto;
    margin-right: 0.5rem;
    fill: ${(props) => props.selected && "white"};
  }

  & > svg:first-of-type {
    fill: ${(props) => props.selected && "white"};
    height: ${(props) => props.selected && "22px"};
    width: ${(props) => props.selected && "22px"};
  }
`;
