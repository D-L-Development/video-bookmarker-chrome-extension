import styled, { css } from "styled-components";
import { COLORS } from "./top-bar/top-bar.styles";
import React from "react";

export const PlaceHolderImg = () => (
  <img
    src={"/images/placeHolder.png"}
    alt={""}
    style={{ marginBlock: "3rem", borderRadius: "1rem" }}
  />
);

export const Container = styled.div`
  width: 100%;
  max-width: 60rem;
  margin-inline: auto;
  height: 100%;
  display: flex;
  flex-direction: ${({ isRow }) => (isRow ? "row" : "column")};
  justify-content: ${({ jc }) => jc};
  align-items: ${({ ai }) => ai};
`;

export const OuterContainer = styled(Container)`
  padding-inline: 1rem;
`;

export const RowContainer = styled(Container).attrs(() => ({ isRow: true }))`
  align-items: center;
  gap: 3rem;

  ${Container} {
    gap: 1rem;
  }
`;

export const StyledText = styled.p`
  color: ${({ color }) => color || COLORS.TEXT_DARK};
`;

export const WideContainer = styled.div`
  width: 100%;
  ${({ colors, degree = 180 }) =>
    colors
      ? css`
          background: linear-gradient(
            ${degree}deg,
            ${colors.map(
              (c, i) =>
                `${c} ${(i + 1) * (100 / colors.length)}%${
                  i + 1 !== colors.length ? "," : ""
                }`
            )}
          );
        `
      : css`
          background-color: ${({ bgColor }) => bgColor || COLORS.PRIMARY};
        `}
`;
