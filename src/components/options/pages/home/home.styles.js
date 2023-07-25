import styled, { css } from "styled-components";
import { COLORS } from "../../top-bar/top-bar.styles";
import { enableGradient, StyledText } from "../../shared.styles";

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
  src: "images/optionsHeaderImage.png",
  alt: "Main application image",
}))`
  height: 20rem;
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
  z-index: -1;
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

export const Card = styled.div`
  position: relative;
  min-height: 20rem;
  width: 15rem;
  padding: 2rem;
  text-align: center;
  flex-direction: column;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.5rem 2.5rem 0.5rem 2.5rem;
  background-color: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(5px);
  box-shadow: -1px 4px 17px 1px rgb(0 0 0 / 35%);
  --thickness: 4px;
  border: var(--thickness) solid grey;

  h3 {
    font-size: 1rem;
    color: ${COLORS.TEXT_DARK};
  }

  svg {
    margin-bottom: 1rem;
  }
`;

export const DummyBox = styled.span`
  position: absolute;
  width: 50%;
  aspect-ratio: 1;
  ${({ isTop }) =>
    isTop
      ? css`
          border-top: var(--thickness) solid ${COLORS.PRIMARY};
          border-left: var(--thickness) solid ${COLORS.PRIMARY};
          top: calc(-1 * var(--thickness));
          left: calc(-1 * var(--thickness));
          border-radius: 0.5rem 0 0 0;
        `
      : css`
          border-bottom: var(--thickness) solid ${COLORS.PRIMARY};
          border-right: var(--thickness) solid ${COLORS.PRIMARY};
          right: calc(-1 * var(--thickness));
          bottom: calc(-1 * var(--thickness));
          border-radius: 0 0 0.5rem 0;
        `}
`;

const chooseCorner = ({ isLeft, corner = true }) =>
  isLeft
    ? css`
        left: 0;
        right: unset;
        ${corner ? "transform: translate(-40%, -40%)" : ""};
      `
    : css`
        right: 0;
        left: unset;
        ${corner ? "transform: translate(40%, -40%)" : ""};
      `;

export const CurvyShape = styled.div`
  aspect-ratio: 1;
  position: absolute;
  width: ${({ width }) => width || "60%"};
  min-width: 35rem;
  border-radius: ${({ shape }) => shape || "50%"};
  z-index: -1;
  top: 0;
  ${chooseCorner}
  ${enableGradient}
`;

export const FooterLinks = styled.nav`
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 0.5rem;
  margin-block: 3rem;
`;

export const FooterExtName = styled.p`
  color: ${COLORS.TEXT_SECONDARY_LIGHT};
  padding-top: 1rem;
  margin-top: 1rem;
  border-top: 1px solid;
  align-self: stretch;

  span:nth-child(2) {
    float: right;
  }

  a {
    color: inherit;
  }
`;
