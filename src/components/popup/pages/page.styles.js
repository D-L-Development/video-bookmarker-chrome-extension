import styled from "styled-components";
import { PageHeader } from "../view-pager/view-pager.styles";
import {
  getHoverColor,
  getTextColor,
  WHITE,
} from "../../../constants/helper-functions";

export const StyledPage = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
`;

export const PageContent = styled.div`
  flex-grow: 1;
  width: 100%;
  overflow-y: auto;
  overscroll-behavior: contain;

  // TODO: when the content slides in with a scrollbar it looks weird. Make it to where the scroll bar appears on scroll and hover
  &::-webkit-scrollbar {
    width: 7px;
  }

  &::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.body_c};
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.scroller_c};
    border-radius: 0.3rem;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.scrollerHover_c};
  }
`;

export const ActionIconWrapper = styled.button`
  border: none;
  transition: 0.2s;
  border-radius: 0.2rem;
  background: none;
  padding: 0.2rem;
  display: flex;
  cursor: ${(props) => (props.enabled ? "pointer" : "")};

  & > * {
    transition-delay: ${(props) => !props.disableColorChangeDelay && "100ms"};
    transition-property: ${(props) => !props.disableColorChangeDelay && "fill"};
  }

  &:first-of-type {
    margin-left: 0.5rem;
  }

  svg {
    fill: ${({ parentColor, enabled }) =>
      enabled ? getTextColor(parentColor || WHITE) : "grey"};
  }

  &:hover {
    background-color: ${({ enabled, parentColor }) =>
      enabled && getHoverColor(parentColor || WHITE)};
  }
`;

export const PageHeaderControls = styled(PageHeader)`
  background: ${({ theme }) => theme.pageControls_c};
  height: 6%;
  min-height: 2.5rem;
  max-height: 3.5rem;
  z-index: 2;
  box-shadow: 0 0.5px 21px 1px rgb(0 0 0 / 40%);
`;

export const NoItemsSign = styled.span`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  white-space: nowrap;
  color: grey;
`;
