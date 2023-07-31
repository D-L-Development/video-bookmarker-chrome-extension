import styled, { css } from "styled-components";
import {
  getHoverColor,
  getTextColor,
} from "../../../../../constants/color-functions";

const DIMEN_PERCENT = "22.5%";
export const FS_MARGIN_PERCENT = "2%";

export const getFSItemStyle = (
  { theme, selected },
  addBorderBottom = false
) => {
  const [hoverC, selectedC] = getHoverColor(theme.body_c, [0.1, 0.2]);
  return css`
    background-color: ${selected && selectedC};
    border-bottom: ${addBorderBottom && `1px solid ${hoverC}`};

    &:hover {
      background-color: ${!selected && hoverC};
    }
  `;
};

export const Square = styled.div`
  width: ${DIMEN_PERCENT};
  padding-bottom: ${DIMEN_PERCENT};
  margin-left: ${FS_MARGIN_PERCENT};
  margin-top: ${FS_MARGIN_PERCENT};
  position: relative;
  cursor: pointer;
  transition: background-color 0.1s;

  svg {
    fill: ${({ theme, isFolder = false }) =>
      isFolder ? theme.folder_c : theme.file_c};
  }

  ${getFSItemStyle}
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
  transition: background-color 150ms ease-in;
  display: flex;
  align-items: center;
  cursor: pointer;

  & > * {
    margin-left: 0.5rem;
  }

  & > svg:last-of-type {
    margin-left: auto;
    margin-right: 0.5rem;
    fill: ${({ selected, theme }) => selected && getTextColor(theme.body_c)};
  }

  ${(props) => getFSItemStyle(props, true)}
`;

export const DetailedViewItem = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: 0.1s;
  border-bottom: 1px solid grey;

  svg {
    fill: ${({ theme, isFolder = false }) =>
      isFolder ? theme.folder_c : theme.file_c};
  }

  ${getFSItemStyle}
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
