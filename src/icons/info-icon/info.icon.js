import React from "react";
import PropTypes from "prop-types";
import {StyledInfoIcon} from "./info.icon.styles";

const InfoIcon = (props) => {
    return (
        <StyledInfoIcon
            width={props.width}
            height={props.height}
            color={props.color}
        />
    );
};

InfoIcon.propTypes = {
    width: PropTypes.string.isRequired,
    height: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
};

export default InfoIcon;