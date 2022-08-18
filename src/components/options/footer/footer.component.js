import React from "react";
import {CopyrightInfo, FooterContainer, FootLink, StyledContainer} from "./footer.styles";
import GithubIcon from "../../../icons/github-icon/github.icon";
import MailIcon from "../../../icons/mail-icon/mail.icon";

const FooterComponent = (props) => {
    return (
        <FooterContainer>
            <StyledContainer>
                <CopyrightInfo><span>&copy;</span> D&L Development</CopyrightInfo>
            </StyledContainer>
            <StyledContainer>
                <GithubIcon width="20" height="20" color="#eeeeee"/>
                <FootLink href="https://github.com/D-L-Development/video-bookmarker-chrome-extension" target="_blank"
                          rel="noopener noreferrer">Github</FootLink>
            </StyledContainer>
            <StyledContainer>
                <MailIcon width="20px" height="20px" color="#eeeeee"/>
                <FootLink href="https://forms.gle/tbj7MWes7bt2Bw3h6" target="_blank"
                          rel="noopener noreferrer">Contact Developers</FootLink>
            </StyledContainer>
        </FooterContainer>
    );
};

export default FooterComponent;