import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomeComponent from "./home/home.component";
import TopBarComponent from "./top-bar/top-bar.component";

const OptionsComponent = () => {
  return (
    <BrowserRouter>
      <TopBarComponent />
      <Routes>
        <Route
          path={"/options.html/settings"}
          element={<HomeComponent />}
        ></Route>
        <Route path={"/options.html/theme"} element={<HomeComponent />}></Route>
        <Route path={"/options.html/about"} element={<HomeComponent />}></Route>
        <Route path={"/options.html"} element={<HomeComponent />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default OptionsComponent;
