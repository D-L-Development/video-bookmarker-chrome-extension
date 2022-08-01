import React from 'react';
import PropTypes from 'prop-types';
import { StyledSaveArrowIcon } from './save-arrow.icon.styles';

const SaveArrowIcon = (props) => {
    return (
        <StyledSaveArrowIcon
            width={props.width}
            height={props.height}
            color={props.color}
        />
    );
};

SaveArrowIcon.propTypes = {
    width: PropTypes.string.isRequired,
    height: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
};

export default SaveArrowIcon;
