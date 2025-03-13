/**
 * @file RandomPlanStep.jsx
 * @description 랜덤 플랜을 위한 옵션 표출 컨포넌트
 * @author jaeyeol
 * @created 2025-03-11
 * @lastModifiedBy jungeun
 * @lastModifiedDate 2025-03-12
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import NavigationButtons from "../components/NavigationButtons.jsx";

const RandomPlanStep = () => {
  const navigate = useNavigate();

  return (
    <motion.div 
      className="next-screen" 
      initial={{ y: 50, opacity: 0 }} 
      animate={{ y: 0, opacity: 1 }} 
      transition={{ duration: 0.5 }}
    >
      <h2>Random Plan 추가 정보</h2>
      <p>돌림판이 들어갈 자리</p>
      <NavigationButtons
          onBack={()=>navigate('/people-count')}
          onNext={()=>navigate(`/chat`)}
      />
    </motion.div>
  );
};

export default RandomPlanStep;
