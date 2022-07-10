import React from "react";
import { render } from "react-dom";

const Popup = () => {
  return (
    <div>
      <h1>{sunshine()}</h1>
    </div>
  );
};

render(<Popup />, document.getElementById("react-popup-root"));
