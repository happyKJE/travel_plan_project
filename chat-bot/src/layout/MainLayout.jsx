import React from "react";
import { Outlet } from "react-router-dom";
import IntroSection from "../components/IntroSection";
import { motion } from "framer-motion";

const MainLayout = () => {
    return (
        <div className="main-layout">
            <IntroSection />
            <motion.div
                className="page-content"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <Outlet />
            </motion.div>
        </div>
    );
};

export default MainLayout;
