import styled from "styled-components";
import {
  bgHoverColor,
  body_c,
  scroller_c,
  scrollerHover_c,
} from "../../../constants/theme";
import { PageHeader } from "../view-pager/view-pager.styles";

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
    background: ${body_c};
  }

  &::-webkit-scrollbar-thumb {
    background: ${scroller_c};
    border-radius: 0.3rem;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: ${scrollerHover_c};
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

  &:hover {
    background-color: ${(props) => props.enabled && bgHoverColor};
  }
`;

export const PageHeaderControls = styled(PageHeader)`
  background: rgb(42, 42, 111);
  background: linear-gradient(
    90deg,
    rgba(42, 42, 111, 1) 0%,
    rgb(68, 68, 131) 49%,
    rgba(42, 42, 111, 1) 100%
  );
  height: 6%;
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