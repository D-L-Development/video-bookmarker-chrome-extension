import styled from "styled-components";
import { body_c, scroller_c, scrollerHover_c } from "../../../constants/theme";

export const StyledPage = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export const PageContent = styled.div`
  flex-grow: 1;
  width: 100%;
  overflow-y: scroll;

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
