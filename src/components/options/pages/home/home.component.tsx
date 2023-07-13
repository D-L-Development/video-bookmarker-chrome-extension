import React from "react";
import {
  Content,
  Features,
  FeatureSection,
  FeatureText,
  HeaderSecondary,
  HeaderText,
  List,
  ListSection,
  Main,
} from "./home.styles";
import BookmarksIcon from "../../../../icons/bookmarks-icon/bookmarks.icon";
import { main_c, pale_c } from "../../colors";

const HomeComponent = () => {
  return (
    <>
      <Main>
        <HeaderText>Web Video Bookmarker</HeaderText>
        <HeaderSecondary>
          All in one extension for managing video annotations and lecture
          outlines
        </HeaderSecondary>
      </Main>
      <Content>
        <ListSection color={pale_c}>
          <List>
            <li>Create folder to organize bookmarks</li>
            <li>Move multiple folders or files at a time</li>
            <li>Editing or renaming has never been easier</li>
            <li>
              File system is synced across all devices using the same chrome
              profile
            </li>
          </List>
        </ListSection>
        <Features>
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
        </Features>
        <Features color={"teal"}></Features>
      </Content>
      <Features color={main_c}></Features>
    </>
  );
};

export default HomeComponent;
