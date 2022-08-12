import React, { useRef } from "react";
import PropTypes from "prop-types";
import {
  HiddenCheckbox,
  StyledSwitch,
  SwitchLabel,
} from "../theme/theme.styles";
import { guid } from "../../../../contentScripts/utility";

const SwitchComponent = ({ checked, handleToggle, width }) => {
  const uuid = useRef(guid());

  return (
    <StyledSwitch width={width}>
      <HiddenCheckbox
        type="checkbox"
        id={uuid.current}
        checked={checked}
        onChange={handleToggle}
      />
      <SwitchLabel htmlFor={uuid.current}>Toggle</SwitchLabel>
    </StyledSwitch>
  );
};

SwitchComponent.propTypes = {
  checked: PropTypes.bool.isRequired,
  handleToggle: PropTypes.func.isRequired,
};

export default SwitchComponent;
