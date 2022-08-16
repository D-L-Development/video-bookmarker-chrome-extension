import React from "react";
import {MemoryRouter, Route, Routes} from "react-router-dom";
import HomeComponent from "./pages/home/home.component";
import SettingsComponent from "./pages/settings/settings.component";
import ThemeComponent from "./pages/theme/theme.component";
import FooterComponent from "./footer/footer.component";
import AboutComponent from "./pages/about/about.component";
import TopBarComponent from "./top-bar/top-bar.component";

const OptionsComponent = () => {
    return (
        <MemoryRouter>
            <TopBarComponent/>
            <Routes>
                <Route path={"/"} element={<HomeComponent/>}/>
                <Route path={"/settings"} element={<SettingsComponent/>}/>
                <Route path={"/theme"} element={<ThemeComponent/>}/>
                <Route path={"/about"} element={<AboutComponent/>}/>
            </Routes>
            <FooterComponent/>
        </MemoryRouter>
    );
};

export default OptionsComponent;
