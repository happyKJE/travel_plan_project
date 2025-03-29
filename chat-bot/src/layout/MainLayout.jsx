// MainLayout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import IntroSection from "../components/IntroSection";
import Background from "../components/Background";
import TravelDestination from "../pages/TravelDestination";

const MainLayout = () => {
    return (
        <>
            <IntroSection />
            <Outlet />
        </>
    );
};

export default MainLayout;
