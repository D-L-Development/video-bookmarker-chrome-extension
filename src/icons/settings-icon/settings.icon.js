import React from "react";
import PropTypes from "prop-types";
import {StyledSettingsIcon} from "./settings.icon.styles";

const SettingsIcon = (props) => {
    return (
        <StyledSettingsIcon
            width={props.width}
            height={props.height}
            color={props.color}
        />
    );
};

SettingsIcon.propTypes = {
    width: PropTypes.string.isRequired,
    height: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
};

export default SettingsIcon;