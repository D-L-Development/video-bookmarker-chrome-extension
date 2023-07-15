import React from "react";
import {
  BackgroundShape,
  Features,
  FeatureSection,
  FeatureText,
  Header,
  HeaderImage,
  HeaderSecondary,
  HeaderText,
  List,
  ListSection,
  Main,
} from "./home.styles";
import BookmarksIcon from "../../../../icons/bookmarks-icon/bookmarks.icon";
import { main_c, pale_c } from "../../colors";
import { Container } from "../../shared.styles";

const HomeComponent = (props) => {
  return (
    <>
      <Main>
        <Container direction={"row"} jc={"space-between"}>
          <Header>
            <HeaderText>A Simple Bookmark Manager</HeaderText>
            <HeaderSecondary>
              All in one extension for managing video annotations and lecture
              outlines
            </HeaderSecondary>
          </Header>
          <HeaderImage />
          <BackgroundShape />
        </Container>
      </Main>

      <ListSection color={pale_c}>
        <Container>
          <List>
            <li>Create folder to organize bookmarks</li>
            <li>Move multiple folders or files at a time</li>
            <li>Editing or renaming has never been easier</li>
            <li>
              File system is synced across all devices using the same chrome
              profile
            </li>
          </List>
        </Container>
      </ListSection>
      <Features>
        <Container direction={"row"}>
          <FeatureSection>
            <BookmarksIcon width={"10rem"} height={"10rem"} color={"brown"} />
            <FeatureText>Full video controls from the extension</FeatureText>
          </FeatureSection>
          <FeatureSection>
            <BookmarksIcon width={"10rem"} height={"10rem"} color={"brown"} />
            <FeatureText>Add annotation to any part in the video</FeatureText>
          </FeatureSection>
          <FeatureSection>
            <BookmarksIcon width={"10rem"} height={"10rem"} color={"brown"} />
            <FeatureText>
              Navigate to the moment that has the annotation
            </FeatureText>
          </FeatureSection>
        </Container>
      </Features>
      <Features color={"teal"}></Features>
      <Features color={main_c}></Features>
    </>
  );
};

export default HomeComponent;
