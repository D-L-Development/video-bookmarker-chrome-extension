import React from "react";
import { ButtonGroup, ButtonGroupBtn } from "./button-group.styles";

function ButtonGroupComponent({ buttons, handleClick, activeBtn }) {
  return (
    <ButtonGroup>
      {buttons.map((btn) => (
        <ButtonGroupBtn
          key={btn}
          active={activeBtn === btn}
          onClick={() => handleClick(btn)}
        >
          {btn}
        </ButtonGroupBtn>
      ))}
    </ButtonGroup>
  );
}

export default ButtonGroupComponent;
