import React from "react";
import {Navigation, StyledLink, TopBar} from "./top-bar.styles";

const TopBarComponent = (props) => {
    return (
        <TopBar>
            <h1>Web Video Bookmarker</h1>
            <p>All in one extension for managing video annotations and lecture outlines.</p>
            <Navigation>
                <StyledLink to="/" end={true}>
                    Home
                </StyledLink>
                <StyledLink to="/settings">Settings</StyledLink>
                <StyledLink to="/theme">Theme</StyledLink>
                <StyledLink to="/about">About</StyledLink>
            </Navigation>
        </TopBar>
    );
};

export default TopBarComponent;
