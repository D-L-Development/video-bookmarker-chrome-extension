import React from "react";
import PropTypes from "prop-types";
import {StyledMailIcon} from "./mail.icon.styles";

const MailIcon = (props) => {
    return (
        <StyledMailIcon
            width={props.width}
            height={props.height}
            color={props.color}
        />
    );
};

MailIcon.propTypes = {
    width: PropTypes.string.isRequired,
    height: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
};

export default MailIcon;