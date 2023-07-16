import styled, { css } from "styled-components";
import { COLORS } from "../../top-bar/top-bar.styles";
import { StyledText } from "../../shared.styles";

export const Main = styled.div`
  padding-block: 3rem 8rem;
  position: relative;
`;

export const Header = styled.header`
  max-width: 20rem;
  flex-direction: column;
  gap: 2rem;
  display: flex;
`;

export const HeaderImage = styled.img.attrs(({}) => ({
  src: "/images/optionsHeaderImage.png",
  alt: "Main application image",
}))`
  height: 18rem;
  transform: translateX(2rem);
  border: 20px solid ${COLORS.TEXT_DARK};
  border-radius: 1rem;
`;

export const MainText = styled.h1`
  font-size: 3rem;
  color: ${COLORS.TEXT_DARK};
`;

export const H2 = styled(StyledText).attrs(() => ({ as: "h2" }))`
  font-size: 2rem;
`;

export const SecondaryText = styled(StyledText)`
  font-size: 1rem;
`;

export const BackgroundShape = styled.div`
  background-color: ${COLORS.PRIMARY};
  height: 15rem;
  width: 35%;
  ${({ isRight }) =>
    isRight
      ? css`
          border-top-left-radius: 1000rem;
          border-bottom-left-radius: 1000rem;
          right: 0;
        `
      : css`
          border-top-right-radius: 1000rem;
          border-bottom-right-radius: 1000rem;
          left: 0;
        `}

  position: absolute;
  bottom: 3rem;
  z-index: -1;
`;

export const Features = styled.div`
  height: 20rem;
  display: flex;
  justify-content: space-around;
  padding-block: 2rem;
  background-color: ${({ color }) => color};
`;

export const FeatureSection = styled.div`
  flex-basis: 23%;
  border-radius: 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  outline: 1px solid grey;
`;

export const FeatureText = styled.span`
  font-size: 1rem;
  padding: 1rem;
  text-align: center;
`;

export const ListSection = styled(Features)`
  justify-content: space-between;
  align-items: center;
`;

export const List = styled.ul`
  height: fit-content;
  font-size: 1.2rem;
  padding-left: 3rem;
  line-height: 2.5rem;
`;
