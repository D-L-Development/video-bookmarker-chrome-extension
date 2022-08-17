import React from "react";
import {ExtensionSlogan, ExtensionTitle, Navigation, StyledLink, TopBarContainer} from "./top-bar.styles";

const TopBarComponent = (props) => {
    return (
        <TopBarContainer>
            <ExtensionTitle>Web Video Bookmarker</ExtensionTitle>
            <ExtensionSlogan>All in one extension for managing video annotations and lecture outlines.</ExtensionSlogan>
            <Navigation>
                <StyledLink to="/" end={true}>Home</StyledLink>
                <StyledLink to="/settings">Settings</StyledLink>
                <StyledLink to="/theme">Theme</StyledLink>
                <StyledLink to="/about">About</StyledLink>
            </Navigation>
        </TopBarContainer>
    );
};

export default TopBarComponent;
