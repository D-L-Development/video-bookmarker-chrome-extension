import React from "react";
import {
  BackgroundShape,
  H2,
  Header,
  HeaderImage,
  Main,
  MainText,
  SecondaryText,
} from "./home.styles";
import {
  Container,
  OuterContainer,
  PlaceHolderImg,
  RowContainer,
  WideContainer,
} from "../../shared.styles";
import { COLORS } from "../../top-bar/top-bar.styles";

const HomeComponent = (props) => {
  return (
    <>
      <Main>
        <OuterContainer isRow={true} jc={"space-between"}>
          <Header>
            <MainText>A Simple Video Bookmark Manager</MainText>
            <SecondaryText>
              All in one extension for managing video annotations and lecture
              outlines
            </SecondaryText>
          </Header>
          <HeaderImage />
          <BackgroundShape />
        </OuterContainer>
      </Main>

      <WideContainer colors={[COLORS.SECONDARY, COLORS.SECONDARY_LIGHT]}>
        <OuterContainer>
          <RowContainer>
            <Container>
              <H2 color={COLORS.TEXT_LIGHT}>
                Effortlessly associate annotations with videos
              </H2>
              <SecondaryText color={COLORS.TEXT_SECONDARY_LIGHT}>
                With Web Video Bookmarker, you can easily associate annotations
                with any video on a webpage. Simply click on the desired
                timestamp to skip directly to that exact moment in the video.
                Take efficient notes and mark important points to enhance your
                learning experience.
              </SecondaryText>
            </Container>
            <PlaceHolderImg />
          </RowContainer>
        </OuterContainer>
      </WideContainer>

      <OuterContainer>
        <RowContainer>
          <PlaceHolderImg />
          <Container>
            <H2 color={COLORS.TEXT_DARK}>Stay organized with a file system</H2>
            <SecondaryText color={COLORS.TEXT_SECONDARY_DARK}>
              Keep your annotated videos organized with Web Video Bookmarker's
              built-in file system. Easily manage and categorize your files,
              allowing for quick access and seamless organization. The popup
              within the browser provides a user-friendly interface to handle
              all your annotation files efficiently.
            </SecondaryText>
          </Container>
        </RowContainer>
      </OuterContainer>

      <WideContainer
        colors={[COLORS.PRIMARY, COLORS.PRIMARY_LIGHT]}
        degree={190}
      >
        <OuterContainer>
          <RowContainer>
            <Container>
              <H2 color={COLORS.TEXT_LIGHT}>
                Share your notes with others by downloading the PDF file
              </H2>
              <SecondaryText color={COLORS.TEXT_SECONDARY_LIGHT}>
                Share your annotated videos with friends and colleagues by
                exporting your annotation files to PDF. Collaborate and exchange
                insights effortlessly, enabling seamless knowledge sharing. Web
                Video Bookmarker makes it simple to collaborate and learn
                together.
              </SecondaryText>
            </Container>
            <PlaceHolderImg />
          </RowContainer>
        </OuterContainer>
      </WideContainer>
    </>
  );
};

export default HomeComponent;
