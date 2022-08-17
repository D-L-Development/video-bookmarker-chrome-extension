import React from "react";
import PropTypes from "prop-types";
import {StyledHomeIcon} from "./home.icon.styles";

const HomeIcon = (props) => {
    return (
        <StyledHomeIcon
            width={props.width}
            height={props.height}
            color={props.color}
        />
    );
};

HomeIcon.propTypes = {
    width: PropTypes.string.isRequired,
    height: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
};

export default HomeIcon;