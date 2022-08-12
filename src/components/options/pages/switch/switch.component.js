import React, { useRef, useState } from "react";
import {
  HiddenCheckbox,
  StyledSwitch,
  SwitchLabel,
} from "../theme/theme.styles";
import { guid } from "../../../../contentScripts/utility";

const SwitchComponent = (props) => {
  const [checked, setChecked] = useState(false);
  const uuid = useRef(guid());

  return (
    <StyledSwitch width={props.width}>
      <HiddenCheckbox
        type="checkbox"
        id={uuid.current}
        onChange={() => setChecked(!checked)}
      />
      <SwitchLabel htmlFor={uuid.current}>Toggle</SwitchLabel>
    </StyledSwitch>
  );
};

export default SwitchComponent;
