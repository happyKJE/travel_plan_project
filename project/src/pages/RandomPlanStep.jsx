// RandomPlanStep.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';

const RandomPlanStep = ({ onNext, onBack }) => {
  const [detail, setDetail] = useState('');

  return (
    <motion.div 
      className="next-screen" 
      initial={{ y: 50, opacity: 0 }} 
      animate={{ y: 0, opacity: 1 }} 
      transition={{ duration: 0.5 }}
    >
      <h2>Random Plan 추가 정보</h2>
      <p>돌림판이 들어갈 자리</p>
      <div className="navigation-buttons">
        <button className="to-back" onClick={onBack}>
          ◀ 이전
        </button>
        <button className='to-next' onClick={() => onNext({ randomDetail: detail })}>
        다음 ▶
        </button>
      </div>
    </motion.div>
  );
};

export default RandomPlanStep;
