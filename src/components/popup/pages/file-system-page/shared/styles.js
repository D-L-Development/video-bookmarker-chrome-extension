import styled from "styled-components";
import { getTextColor } from "../../../../../constants/color-functions";

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

  background-color: ${(props) =>
    props.selected && props.theme.fsItemSelected_c};
  outline: ${(props) =>
    props.selected && `1px solid ${props.theme.fsItemSelectedOutline_c};`};

  &:hover {
    background-color: ${(props) =>
      !props.selected && props.theme.fsItemHover_c};
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
  color: ${({ theme }) => getTextColor(theme.body_c)};
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
    props.selected ? props.theme.selected_folder_c : "white"};
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

export const DetailedViewItem = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: 0.1s;
  border-bottom: 1px solid grey;

  background-color: ${(props) =>
    props.selected && props.theme.fsItemSelected_c};

  &:hover {
    background-color: ${(props) =>
      !props.selected && props.theme.fsItemHover_c};
  }
`;

export const DetailedItemName = styled.span`
  margin-left: 0.5rem;
  color: ${({ theme }) => getTextColor(theme.body_c)};
`;
export const DetailedItemIconWrapper = styled.span`
  margin-left: 0.5rem;
  display: flex;
  padding-block: 0.2rem;
`;

export const DetailedItemDate = styled.span`
  margin-left: auto;
  margin-right: 2rem;
  color: #666666;
`;
