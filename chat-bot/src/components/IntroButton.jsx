import React, {useCallback, useEffect} from 'react';
import { motion } from 'framer-motion';
import useStore from "../context/UseStore.jsx";
import '../styles/introButton.css';
import {useNavigate} from "react-router-dom";

const Button = ({ type, text, onClick, animationDelay }) => {
  return (
    <motion.button
      className={type}
      onClick={onClick}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: animationDelay, duration: 1 }}
    >
      {text}
    </motion.button>
  );
};

const IntroButton = () => {
    const { state,dispatch } = useStore();
    const navigate = useNavigate();

    const handlePlanSelect = useCallback((planType) => {
        dispatch({ type: 'SELECT_PLAN', payload: planType });
    }, [dispatch]);

    useEffect(() => {
        navigate('/people-count')
    }, [state.planType]);

  return (
    <div className="buttons">
      <Button
        type="random-plan"
        text="Random PLAN ▶"
        animationDelay={1.2}
        onClick={() => {handlePlanSelect('random')} }
      />
      <Button
        type="custom-plan"
        text="Customized Travel PLAN ▶"
        animationDelay={1.6}
        onClick={() => handlePlanSelect('custom') }
      />
    </div>
  );
};

export default IntroButton;
