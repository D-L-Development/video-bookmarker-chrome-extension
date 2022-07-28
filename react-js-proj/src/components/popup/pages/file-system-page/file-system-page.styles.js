import styled from "styled-components";
import { PageContent } from "../page.styles";
import { FS_MARGIN_PERCENT } from "./shared/styles";
import { PageHeader } from "../../view-pager/view-pager.styles";

export const FileSystemContent = styled(PageContent)`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: start;
  height: 90%;
  align-content: start;
  padding-bottom: ${FS_MARGIN_PERCENT};
`;

export const ActionIconWrapper = styled.button`
  border: none;
  transition: 0.2s;
  border-radius: 0.2rem;
  background: none;
  padding: 0.2rem;
  display: flex;
  cursor: ${(props) => (props.enabled ? "pointer" : "")};

  &:first-of-type {
    margin-left: 0.5rem;
  }

  &:hover {
    background-color: ${(props) => props.enabled && "rgba(255, 255, 255, 0.2)"};
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
  box-shadow: 0px 0.5px 21px 1px rgb(0 0 0 / 40%);
`;
