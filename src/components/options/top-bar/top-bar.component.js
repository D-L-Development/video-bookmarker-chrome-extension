import React from "react";
import {ExtensionSlogan, ExtensionTitle, NavButton, Navigation, StyledLink, TopBarContainer} from "./top-bar.styles";

const TopBarComponent = (props) => {
    return (
        <TopBarContainer>
            <ExtensionTitle>Web Video Bookmarker</ExtensionTitle>
            <ExtensionSlogan>All in one extension for managing video annotations and lecture outlines.</ExtensionSlogan>
            <Navigation>
                <NavButton>
                    <StyledLink to="/" end={true}>Home</StyledLink>
                </NavButton>
                <NavButton>
                    <StyledLink to="/settings">Settings</StyledLink>
                </NavButton>
                <NavButton>
                    <StyledLink to="/theme">Theme</StyledLink>
                </NavButton>
                <NavButton>
                    <StyledLink to="/about">About</StyledLink>
                </NavButton>
            </Navigation>
        </TopBarContainer>
    );
};

export default TopBarComponent;
