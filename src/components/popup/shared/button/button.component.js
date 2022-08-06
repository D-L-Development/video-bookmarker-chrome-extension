import { StyledButton } from "./button.styles";
import React from "react";
import PropTypes from "prop-types";

const Button = (props) => {
  return (
    <StyledButton type={props.type} color={props.color} bgColor={props.bgColor}>
      {props.children}
    </StyledButton>
  );
};

Button.propTypes = {
  type: PropTypes.oneOf(["outline", "filled"]).isRequired,
  color: PropTypes.string.isRequired,
  bgColor: PropTypes.string.isRequired,
};

export default Button;
