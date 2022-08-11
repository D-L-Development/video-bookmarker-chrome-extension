import React from "react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import HomeComponent from "./pages/home/home.component";
import TopBarComponent from "./top-bar/top-bar.component";
import SettingsComponent from "./pages/settings/settings.component";

const OptionsComponent = () => {
  return (
    <MemoryRouter>
      <TopBarComponent />
      <Routes>
        <Route path={"/"} element={<HomeComponent />} />
        <Route path={"/settings"} element={<SettingsComponent />} />
        <Route path={"/theme"} element={<HomeComponent />} />
        <Route path={"/about"} element={<HomeComponent />} />
      </Routes>
    </MemoryRouter>
  );
};

export default OptionsComponent;
