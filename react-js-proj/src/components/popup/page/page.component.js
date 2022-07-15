import React from "react";
import { StyledPage } from "./page.styles";

const PageComponent = (props) => {
  return <StyledPage>{props.children}</StyledPage>;
};

export default PageComponent;
