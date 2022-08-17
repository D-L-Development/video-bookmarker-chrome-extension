import React from "react";
import {CopyrightInfo, FooterContainer, FootLink, StyledContainer} from "./footer.styles";

const FooterComponent = (props) => {
    return (
        <FooterContainer>
            <StyledContainer>
                <div id="Copyright-Icon"/>
                <CopyrightInfo>Copyright Info</CopyrightInfo>
            </StyledContainer>
            <StyledContainer>
                <StyledContainer id="Github-Icon"/>
                <FootLink href="">Github</FootLink>
            </StyledContainer>
            <StyledContainer>
                <StyledContainer id="Contact-Icon"/>
                <FootLink href="">Contact Developers</FootLink>
            </StyledContainer>
        </FooterContainer>
    );
};

export default FooterComponent;