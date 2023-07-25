import React from "react";
import {
  Container,
  OuterContainer,
  RowContainer,
  WideContainer,
} from "../../shared.styles";
import { EXTENSION_NAME } from "../../data/extensionDetails";
import { COLORS } from "../../top-bar/top-bar.styles";
import * as Styled from "./about.styles";

function AboutComponent(props) {
  return (
    <WideContainer
      style={{
        flex: "1",
        alignItems: "center",
        display: "flex",
        minHeight: "35rem",
      }}
      colors={[COLORS.PRIMARY, COLORS.PRIMARY_LIGHT]}
    >
      <OuterContainer gap={"3rem"}>
        <RowContainer>
          <img
            alt={"Dako's profile picture"}
            src={"images/dakoalbeik.jpg"}
            style={{ width: "13rem", aspectRatio: "1", borderRadius: "50%" }}
          />

          <Container>
            <h1 style={{ color: COLORS.TEXT_LIGHT }}>About {EXTENSION_NAME}</h1>
            <p style={{ color: COLORS.TEXT_SECONDARY_LIGHT }}>
              Hi, I'm <b>Dako Albeik</b>, a passionate software engineer with a
              background in web development. I find joy in crafting innovative
              applications that address real-world challenges. During my college
              years, I encountered a common struggle while watching lengthy
              lecture recordings – losing focus and missing crucial information.
              Determined to enhance the learning experience, I created the Web
              Video Bookmarker extension. This powerful tool allows users to
              associate annotations with videos, providing clickable timestamps
              to navigate to specific moments effortlessly. As someone who
              believes in the power of knowledge sharing, I decided to share
              this extension with the world. Explore more of my projects and
              endeavors at{" "}
              <Styled.PortfolioLink
                href={"https://www.dakoalbeik.com"}
                target={"_blank"}
              >
                dakoalbeik.com
              </Styled.PortfolioLink>{" "}
              <br />
              <br /> Let's make learning an engaging and enriching journey
              together!
            </p>
          </Container>
        </RowContainer>
      </OuterContainer>
    </WideContainer>
  );
}

export default AboutComponent;
