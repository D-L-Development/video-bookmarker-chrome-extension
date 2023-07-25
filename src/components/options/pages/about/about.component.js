import React from "react";
import { OuterContainer } from "../../shared.styles";
import { EXTENSION_NAME } from "../../data/extensionDetails";

function AboutComponent(props) {
  return (
    <OuterContainer>
      <h1>About {EXTENSION_NAME}</h1>
    </OuterContainer>
  );
}

export default AboutComponent;
