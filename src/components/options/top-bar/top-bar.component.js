import React from "react";
import {ExtensionSlogan, ExtensionTitle, Navigation, StyledLink, TopBarContainer} from "./top-bar.styles";
import InfoIcon from "../../../icons/info-icon/info.icon";
import SettingsIcon from "../../../icons/settings-icon/settings.icon";
import HomeIcon from "../../../icons/home-icon/home.icon";
import ThemeIcon from "../../../icons/theme-icon/theme.icon";

const TopBarComponent = (props) => {
    return (
        <TopBarContainer>
            <ExtensionTitle>Web Video Bookmarker</ExtensionTitle>
            <ExtensionSlogan>All in one extension for managing video annotations and lecture outlines.</ExtensionSlogan>
            <Navigation>
                <StyledLink to="/" end={true}>
                    <HomeIcon width="20px" height="20px" color="#eeeeee"/>
                    <div>Home</div>
                </StyledLink>
                <StyledLink to="/settings">
                    <SettingsIcon width="20px" height="20px" color="#eeeeee"/>
                    <div>Settings</div>
                </StyledLink>
                <StyledLink to="/theme">
                    <ThemeIcon width="20px" height="20px" color="#eeeeee"/>
                    <div>Theme</div>
                </StyledLink>
                <StyledLink to="/about">
                    <InfoIcon width="20px" height="20px" color="#eeeeee"/>
                    <div>About</div>
                </StyledLink>
            </Navigation>
        </TopBarContainer>
    );
};

export default TopBarComponent;
