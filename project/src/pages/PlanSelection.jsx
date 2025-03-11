import React from 'react';
import { motion } from 'framer-motion';

const PlanSelection = ({ onSelectPlan }) => {
  return (
    <motion.div 
      className="next-screen" 
      initial={{ y: 50, opacity: 0 }} 
      animate={{ y: 0, opacity: 1 }} 
      transition={{ duration: 0.5 }}
    >
      <h2>플랜 선택</h2>
      <div className="plan-buttons">
        <button className='random-plan' onClick={() => onSelectPlan('random')}>Random Plan</button>
        <button className='custom-plan' onClick={() => onSelectPlan('custom')}>Customized Travel Plan</button>
      </div>
    </motion.div>
  );
};

export default PlanSelection;
