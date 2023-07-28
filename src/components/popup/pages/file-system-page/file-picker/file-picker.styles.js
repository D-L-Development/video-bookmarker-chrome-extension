import styled from "styled-components";
import { PageContent } from "../../page.styles";
import { getHoverColor } from "../../../../../constants/color-functions";

export const ScrollableBody = styled(PageContent)`
  height: 10rem;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
`;

export const FilePickerBackButton = styled.button`
  background: none;
  outline: none;
  border: none;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.25rem;
  margin-left: 0.5rem;
  transition: background-color 150ms ease-in;
  cursor: ${(props) => (props.enabled ? "pointer" : "")};

  &:hover {
    background-color: ${({ enabled, theme }) =>
      enabled && getHoverColor(theme.pageHeader_c)};
  }
`;

export const FilePickerTitle = styled.span`
  color: white;
  margin-left: 0.5rem;
`;

export const NoFoldersSign = styled.span`
  margin: auto;
  font-style: italic;
  color: #acacac;
`;
