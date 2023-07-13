import styled from "styled-components";

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
  background-color: ${({ theme }) => theme.body_c};
  /* scrolls the view to the left */
  left: ${(props) => (props.pageNum === "first" ? "0" : "-100%")};
  transition: all 0.5s ease-in-out;
`;

export const PageHeader = styled.div`
  background: ${({ theme }) => theme.pageHeader_c};
  height: 5%;
  min-height: 2rem;
  max-height: 2.8rem;
  display: flex;
  align-items: center;
  box-shadow: 0px 0.5px 21px 1px rgb(0 0 0 / 40%);
`;
