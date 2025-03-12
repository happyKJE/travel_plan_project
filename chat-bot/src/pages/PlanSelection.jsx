import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import useStore from "../context/UseStore.jsx";

const PlanSelection = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useStore();

  const handlePlanSelect =async (planType) => {
   await dispatch({ type: 'SELECT_PLAN', payload: planType });
      console.log(planType);
      navigate('/people-count');
  };

  return (
    <motion.div
      className="next-screen" 
      initial={{ y: 50, opacity: 0 }} 
      animate={{ y: 0, opacity: 1 }} 
      transition={{ duration: 0.5 }}
    >
      <h2>플랜 선택</h2>
      <div className="plan-buttons">
        <button className='random-plan' onClick={() => handlePlanSelect('random')}>Random Plan</button>
        <button className='custom-plan' onClick={() => handlePlanSelect('custom')}>Customized Travel Plan</button>
      </div>
    </motion.div>
  );
};

export default PlanSelection;
