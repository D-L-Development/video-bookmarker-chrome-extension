import React from "react";
import {
  BackgroundShape,
  Card,
  CircleShape,
  DummyBox,
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
import { renderBookmarks } from "../../data/bookmarksContent";
import { renderFileSystem } from "../../data/fileSystemContent";
import PaletteIcon from "../../../../icons/palette-icon/palette.icon";
import CogIcon from "../../../../icons/cog-icon/cog.icon";

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
          <BackgroundShape isRight={true} />
        </OuterContainer>
      </Main>

      <WideContainer colors={[COLORS.SECONDARY, COLORS.SECONDARY_LIGHT]}>
        <OuterContainer pb={"3rem"}>
          <RowContainer pb={"0"}>
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
            {renderBookmarks()}
          </RowContainer>
        </OuterContainer>
      </WideContainer>

      <OuterContainer>
        <RowContainer pb={"3rem"}>
          {renderFileSystem()}
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
      <div style={{ position: "relative", overflow: "hidden" }}>
        <OuterContainer style={{ alignItems: "center", paddingBlock: "3rem" }}>
          <H2 color={COLORS.TEXT_DARK}>Customize the theme and settings</H2>
          <SecondaryText color={COLORS.TEXT_SECONDARY_DARK}>
            Select between light mode or dark mode and enjoy creating your own
            custom theme by using your favorite colors
          </SecondaryText>
          <RowContainer
            style={{ justifyContent: "center", paddingTop: "2rem" }}
          >
            {[
              {
                title: "Create custom themes",
                text: "Keep it moving",
                icon: (
                  <PaletteIcon
                    width={"128px"}
                    height={"128px"}
                    color={COLORS.TEXT_DARK}
                  />
                ),
              },
              {
                title: "Configure your own settings",
                text: "Keep it moving",
                icon: (
                  <CogIcon
                    width={"128px"}
                    height={"128px"}
                    color={COLORS.TEXT_DARK}
                  />
                ),
              },
            ].map(({ title, text, icon }) => (
              <Card>
                {icon}
                <h3>{title}</h3>
                {/*<p>{text}</p>*/}
                <DummyBox isTop={true} />
                <DummyBox />
              </Card>
            ))}
          </RowContainer>
          <BackgroundShape />
        </OuterContainer>
        <CircleShape />
      </div>
    </>
  );
};

export default HomeComponent;
