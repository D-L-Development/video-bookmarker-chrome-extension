import React from "react";
import {
  BackgroundShape,
  Card,
  CurvyShape,
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
  RowContainer,
  WideContainer,
} from "../../shared.styles";
import { COLORS } from "../../top-bar/top-bar.styles";
import { renderBookmarks } from "../../data/bookmarksContent";
import { renderFileSystem } from "../../data/fileSystemContent";
import FileSharingSvg from "../../../../../public/optionsImages/shareFiles.svg";
import SettingsSvg from "../../../../../public/optionsImages/settings.svg";
import PaletteSvg from "../../../../../public/optionsImages/palette.svg";
import styled from "styled-components";

const SettingsIcon = styled(SettingsSvg)`
  path {
    stroke: grey;
  }
`;

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

      <WideContainer
        colors={[COLORS.SECONDARY, COLORS.SECONDARY_LIGHT]}
        style={{ position: "relative" }}
      >
        <CurvyShape
          shape={"48% 52% 57% 43% / 49% 33% 67% 51% "}
          width={"40%"}
          color={COLORS.PRIMARY}
          isLeft={true}
          corner={false}
          style={{ margin: "2rem" }}
          colors={[COLORS.PRIMARY_LIGHT, COLORS.PRIMARY]}
        />
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
          <RowContainer style={{ paddingBlock: "3rem" }}>
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
            <FileSharingSvg
              alt={
                "File sharing illustration image by pikisuperstar on Freepik"
              }
              title={
                "File sharing illustration image by pikisuperstar on Freepik"
              }
              style={{ width: "55rem" }}
            />
          </RowContainer>
        </OuterContainer>
      </WideContainer>
      <div style={{ position: "relative", overflow: "hidden" }}>
        <BackgroundShape />
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
                icon: <PaletteSvg />,
              },
              {
                title: "Configure your own settings",
                text: "Keep it moving",
                icon: <SettingsIcon />,
              },
            ].map(({ title, text, icon }) => (
              <Card key={title}>
                {icon}
                <h3>{title}</h3>
                {/*<p>{text}</p>*/}
                <DummyBox isTop={true} />
                <DummyBox />
              </Card>
            ))}
          </RowContainer>
        </OuterContainer>
        <CurvyShape
          degree={"300"}
          colors={[COLORS.SECONDARY, COLORS.SECONDARY_LIGHT]}
        />
      </div>
    </>
  );
};

export default HomeComponent;
