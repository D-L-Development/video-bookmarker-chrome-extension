import React from "react";
import PropTypes from "prop-types";
import {StyledThemeIcon} from "./theme.icon.styles";

const ThemeIcon = (props) => {
    return (
        <StyledThemeIcon
            width={props.width}
            height={props.height}
            color={props.color}
        />
    );
};

ThemeIcon.propTypes = {
    width: PropTypes.string.isRequired,
    height: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
};

export default ThemeIcon;