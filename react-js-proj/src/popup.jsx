import React from "react";
import { createRoot } from "react-dom/client";

const Popup = () => {
  return (
    <div>
      <h1>Hello</h1>
    </div>
  );
};

const container = document.getElementById("react-popup-root");
const root = createRoot(container);
root.render(<Popup tab="home" />);
