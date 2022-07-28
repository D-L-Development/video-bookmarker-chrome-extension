import styled from "styled-components";
import { body_c, pageHeader_c } from "../../../constants/theme";

export const Content = styled.div`
  flex-grow: 1;
  position: relative;
  overflow-x: hidden;
`;

export const StyledViewPager = styled.div`
  width: 200%;
  height: 100%;
  position: absolute;
  top: 0;
  display: flex;
  background-color: ${body_c};
  /* scrolls the view to the left */
  left: ${(props) => (props.pageNum === "first" ? "0" : "-100%")};
  transition: all 0.5s ease-in-out;
`;

export const PageHeader = styled.div`
  background: ${pageHeader_c};
  height: 5%;
  display: flex;
  align-items: center;
`;
