// PagesIndex.jsx
import React from 'react';
import useStore from '../context/UseStore.jsx';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';

const PagesIndex = () => {
    const { state } = useStore();
    const location = useLocation();

    return (
        <motion.div
            key={location.pathname}
            className='steps-container'
            initial={{ y: 0, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
        >
            <ul className="index-number">
                {state.planType === 'custom' && (
                    <>
                        <StepItem step="1" label="인원" path="/people-count" currentPath={location.pathname} />
                        <StepItem step="2" label="일정" path="/dates-selection" currentPath={location.pathname} />
                        <StepItem step="3" label="지역" path="/region-selection" currentPath={location.pathname} />
                        <StepItem step="4" label="여행스타일" path="/plan-details/custom" currentPath={location.pathname} />
                    </>
                )}
                {state.planType === 'random' && (
                    <>
                        <StepItem step="1" label="일정" path="/dates-selection" currentPath={location.pathname} />
                        <StepItem step="2" label="돌림판" path="/plan-details/random" currentPath={location.pathname} />
                    </>
                )}
            </ul>
        </motion.div>
    );
};

const StepItem = ({ step, label, path, currentPath }) => {
    const isActive = currentPath === path;
    return (
        <li className={`tab ${isActive ? 'active' : ''}`}>
            <div className="step-circle">{step}</div>
            <span className="step-label">{label}</span>
        </li>
    );
};

export default PagesIndex;
