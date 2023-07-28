import styled from "styled-components";
import {
  getHoverColor,
  getTextColor,
} from "../../../../constants/helper-functions";

export const ContextMenu = styled.div`
  position: absolute;
  top: calc(100% + 0.5rem);
  display: flex;
  flex-direction: column;
  width: fit-content;
  background: ${({ bgColor, theme }) => bgColor || theme.pageControls_c};
  color: ${({ color, theme }) => color || getTextColor(theme.pageControls_c)};
  border-radius: 0.2rem;
  padding: 0.2rem;
  gap: 0.1rem;
  box-shadow: -2px 2px 5px 0 rgba(0, 0, 0, 0.4);
  z-index: 3;
`;

export const ContextMenuItem = styled.div`
  padding: 0.2rem;
  cursor: pointer;
  transition: 0.2s;
  border-radius: inherit;
  display: flex;
  align-items: center;

  &:hover {
    background-color: ${({ theme }) => getHoverColor(theme.pageControls_c)};
  }
`;

export const ContextMenuItemIcon = styled.div`
  margin-right: 0.2rem;
  display: flex;
`;

export const ContextMenuItemText = styled.span`
  white-space: nowrap;
  margin-right: 0.2rem;
`;
