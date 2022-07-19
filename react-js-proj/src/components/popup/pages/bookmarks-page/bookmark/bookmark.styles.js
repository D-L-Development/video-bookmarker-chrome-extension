import styled from "styled-components";
import {
  bookmarkHeader_c,
  bookmarkHeaderNested_c,
} from "../../../../../constants/theme";

export const Bookmark = styled.div`
  height: fit-content;
  margin: 0.5rem;
  margin-left: ${(props) => props.isNested && "2rem"};
  -webkit-box-shadow: 0px 2px 7px 0px rgba(0, 0, 0, 0.78);
  box-shadow: 0px 2px 7px 0px rgba(0, 0, 0, 0.78);
  &:first-of-type {
    margin-top: 1rem;
  }
`;

export const BookmarkHeader = styled.div`
  background-color: ${(props) =>
    props.isNested ? bookmarkHeaderNested_c : bookmarkHeader_c};
  display: flex;
  padding: 0.25rem;
  border-top-left-radius: 0.2rem;
  border-top-right-radius: 0.2rem;
`;

export const BookmarkTitle = styled.span`
  margin-left: 0.5rem;
  font-size: 1rem;
  white-space: nowrap;
`;

export const BookmarkTimestamp = styled.span`
  background-color: rgb(194, 66, 66);
  padding: 0.1rem 0.4rem;
  border-radius: 0.6rem;
  text-align: center;
  cursor: pointer;
  &:hover {
    color: lightblue;
  }
`;

export const BookmarkHeaderText = styled.p`
  color: white;
  font-size: 0.8rem;
  letter-spacing: 0.1rem;
  margin-left: 0.3rem;
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
  padding: 0.25rem;
  margin-bottom: 0.5rem;
`;
export const BookmarkIconWrapper = styled.div``;
