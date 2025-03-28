// NoIntroLayout.jsx
import React from "react";
import { Outlet } from "react-router-dom";

const NoIntroLayout = () => {
    return (
        <>
            <Outlet />
        </>
    );
};

export default NoIntroLayout;
