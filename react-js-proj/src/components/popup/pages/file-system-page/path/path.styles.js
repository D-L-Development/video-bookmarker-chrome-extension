import styled from "styled-components";

export const PathWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  width: 55%;
`;

export const Path = styled.span`
  color: #ffffff;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  &:first-of-type {
    margin-left: 0.3rem;
  }
`;

export const BackArrowIconButton = styled.button`
  display: flex;
  width: fit-content;
  height: 65%;
  outline: none;
  border: none;
  background-color: transparent;
  border-right: 1px solid grey;
  align-items: center;
  padding-inline: 0.3rem;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
`;

export const FolderIconWrapper = styled.span`
  margin-left: 0.4rem;
  display: flex;
`;
