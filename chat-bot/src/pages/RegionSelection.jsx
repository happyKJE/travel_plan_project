/**
 * @file RegionSelection.jsx
 * @description 지도 기능 추가
 * @author jaeyeol
 * @created 2025-03-13
 * @lastModifiedBy jaeyeol
 * @lastModifiedDate 2025-03-14
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import useStore from '../context/UseStore.jsx';
import NavigationButtons from "../components/NavigationButtons.jsx";
import SouthKoreaMap from "../components/SouthKoreaMap";

const RegionSelection = () => {
    const navigate = useNavigate();
    const { state } = useStore();

    return (
        <motion.div
            className="next-screen"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1 }}
        >
            <h2>어디로 가볼까요?</h2>
            <SouthKoreaMap />

            <NavigationButtons
                onBack={() => navigate('/dates-selection')}
                onNext={() => navigate(`/plan-details/${state.planType}`)}
            />
        </motion.div>
    );
};

export default RegionSelection;
