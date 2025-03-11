// CustomizedPlanStep.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';

const CustomizedPlanStep = ({ onNext, onBack }) => {
  const [detail, setDetail] = useState('');

  const options1 = [
    { label: '느릿느릿', value: 'fasttravel' },
    { label: '빨리빨리', value: 'slowtravel' },
    { label: '상관없음', value: 'nomatter' },
  ];
  const options2 = [
    { label: '숲', value: 'mountain' },
    { label: '바다', value: '2' },
    { label: '계곡', value: '3-4' },
    { label: '섬', value: 'direct' },
    { label: '상관없음', value: 'nomatter' },
  ];
  const options3 = [
    { label: '자동차', value: 'car' },
    { label: '대중교통', value: 'bmw' },
    { label: '뚜벅이', value: 'walk' },
    { label: '상관없음', value: 'nomatter' },
  ];

  return (
    <motion.div 
      className="next-screen" 
      initial={{ y: 50, opacity: 0 }} 
      animate={{ y: 0, opacity: 1 }} 
      transition={{ duration: 0.5 }}
    >
      <h2>아래 내용에서 골라주세요</h2>
      <div className="navigation-buttons">
        <button className="to-back" onClick={onBack}>
          ◀ 이전
        </button>
        <button className='to-next' onClick={() => onNext({ customDetail: detail })}>
          다음 ▶
        </button>
      </div>
    </motion.div>
  );
};

export default CustomizedPlanStep;
