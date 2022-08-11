import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomeComponent from "./pages/home/home.component";
import TopBarComponent from "./top-bar/top-bar.component";
import SettingsComponent from "./pages/settings/settings.component";

const OptionsComponent = () => {
  return (
    <BrowserRouter>
      <TopBarComponent />
      <Routes>
        <Route path={"/options.html"} element={<HomeComponent />} />
        <Route
          path={"/options.html/settings"}
          element={<SettingsComponent />}
        />
        <Route path={"/options.html/theme"} element={<HomeComponent />} />
        <Route path={"/options.html/about"} element={<HomeComponent />} />
      </Routes>
    </BrowserRouter>
  );
};

export default OptionsComponent;
