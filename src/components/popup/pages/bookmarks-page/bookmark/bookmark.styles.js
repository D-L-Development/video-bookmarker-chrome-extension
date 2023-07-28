import styled, { css } from "styled-components";
import { ActionIconWrapper } from "../../page.styles";
import {
  getHoverColor,
  getTextColor,
} from "../../../../../constants/color-functions";

export const Bookmark = styled.div`
  height: fit-content;
  margin: 0.5rem;
  margin-left: ${(props) => props.isNested && "2rem"};
  box-shadow: -1px 4px 17px 1px rgb(0 0 0 / 35%);
  transition: margin-left 150ms;
  background-color: ${({ theme }) => theme.bookmarkBody_c};
  border-radius: 0.5rem;
  --padding-inline: 0.6rem;
  --padding-block: 0.4rem;

  &:first-of-type {
    margin-top: 1rem;
  }
`;

export const BookmarkHeader = styled.div`
  background-color: ${({ isNested, theme }) =>
    isNested ? theme.bookmarkHeaderNested_c : theme.bookmarkHeader_c};
  transition: background-color 150ms;
  display: flex;
  padding: var(--padding-block) var(--padding-inline);
  border-top-left-radius: inherit;
  border-top-right-radius: inherit;
`;

export const BookmarkTimestamp = styled.div`
  background-color: rgb(194, 66, 66);
  padding: 0.1rem 0.4rem;
  border-radius: 0.6rem;
  text-align: center;
  cursor: pointer;

  &:hover {
    color: lightblue;
  }
`;

export const BookmarkHeaderText = styled.div`
  color: white;
  font-size: 0.8rem;
  letter-spacing: 0.1rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const BookmarkHeaderIconGroup = styled.div`
  margin-left: auto;
  margin-right: 0.2rem;
  display: flex;
  width: 30%;
  justify-content: flex-end;
  gap: 0.1rem;
  align-items: center;
`;
export const BookmarkBodyText = styled.div`
  padding: 0 var(--padding-inline) var(--padding-inline);
  overflow-wrap: break-word;
  font-size: 0.75rem;
  border-bottom-left-radius: inherit;
  border-bottom-right-radius: inherit;
  // TODO: make sure you set the color based on the bg
`;

export const BookmarkTitle = styled.h2`
  padding: var(--padding-block) var(--padding-inline);
  font-size: 1rem;
  font-weight: 500;
  white-space: nowrap;
  border-bottom-left-radius: inherit;
  border-bottom-right-radius: inherit;
  color: black;
  // TODO: make sure you set the color based on the bg
`;

export const BookmarkIconWrapper = styled(ActionIconWrapper)`
  padding: 0.1rem;

  ${({ theme, isNested }) => {
    const parentColor = isNested
      ? theme.bookmarkHeaderNested_c
      : theme.bookmarkHeader_c;
    return css`
      :hover {
        background-color: ${getHoverColor(parentColor)};
      }

      svg {
        fill: ${getTextColor(parentColor)};
      }
    `;
  }}
`;

export const HighlightedText = styled.span`
  background-color: #ffff54;
  color: black;
`;
