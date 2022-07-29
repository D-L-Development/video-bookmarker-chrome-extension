import styled from "styled-components";
import { PageHeader } from "../../../view-pager/view-pager.styles";

const bgHoverColor = "rgba(255, 255, 255, 0.2)";

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

export const NewButton = styled.div`
  display: flex;
  align-items: center;
  padding: 0.2rem;
  border-radius: 0.2rem;
  cursor: pointer;
  transition: 0.2s;
  margin-left: 0.5rem;

  &:hover {
    background-color: ${bgHoverColor};
  }
`;

export const NewButtonText = styled.span`
  color: white;
  padding-right: 0.2rem;
  padding-left: 0.3rem;
`;
