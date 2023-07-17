import styled, { css } from "styled-components";
import { COLORS } from "./top-bar/top-bar.styles";
import React from "react";

export const PlaceHolderImg = ({ width, aspectRatio = "1" }) => (
  <img
    src={"/images/placeHolder.png"}
    alt={""}
    style={{ marginBlock: "3rem", borderRadius: "1rem", width, aspectRatio }}
  />
);

export const Container = styled.div`
  width: 100%;
  max-width: 60rem;
  margin-inline: auto;
  height: 100%;
  display: flex;
  z-index: 1;
  padding-block: ${({ pb }) => pb || "0"};
  flex-direction: ${({ isRow }) => (isRow ? "row" : "column")};
  gap: ${({ gap }) => gap || "1rem"};
  justify-content: ${({ jc }) => jc};
  align-items: ${({ ai }) => ai};
`;

export const OuterContainer = styled(Container)`
  padding-inline: 1rem;
`;

export const RowContainer = styled(Container).attrs(() => ({ isRow: true }))`
  align-items: center;
  gap: 3rem;
`;

export const StyledText = styled.p`
  color: ${({ color }) => color || COLORS.TEXT_DARK};
`;

export const enableGradient = ({ colors, degree = 180 }) =>
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
      `;

export const WideContainer = styled.div`
  width: 100%;
  overflow: hidden;
  z-index: -1;
  ${enableGradient}
`;
