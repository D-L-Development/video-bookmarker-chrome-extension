import React from "react";
import PropTypes from "prop-types";
import {StyledGithubIcon} from "./github.icon.styles";

const GithubIcon = (props) => {
    return (
        <StyledGithubIcon
            width={props.width}
            height={props.height}
            color={props.color}
        />
    );
};

GithubIcon.propTypes = {
    width: PropTypes.string.isRequired,
    height: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
};

export default GithubIcon;