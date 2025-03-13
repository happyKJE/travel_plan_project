// PeopleCount.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/PeopleCount.css';

const PeopleCount = ({ onNext, onBack }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [customCount, setCustomCount] = useState('');

  const options = [
    { label: '1명', value: '1' },
    { label: '2명', value: '2' },
    { label: '3~4명', value: '3-4' },
    { label: '직접입력', value: 'direct' },
  ];

  const handleOptionSelect = (value) => {
    setSelectedOption(value);
    if (value !== 'direct') {
      setCustomCount('');
    }
  };

  const handleNext = () => {
    if (selectedOption === 'direct') {
      onNext({ numPeople: customCount });
    } else {
      onNext({ numPeople: selectedOption });
    }
  };

  const isDisabled = !selectedOption || (selectedOption === 'direct' && !customCount);

  return (
    <motion.div 
      className="next-screen" 
      initial={{ y: 50, opacity: 0 }} 
      animate={{ y: 0, opacity: 1 }} 
      transition={{ duration: 1 }}
    >
      <h2>몇 명이서 가시나요?</h2>
      <div className="options-container">
        {options.map((option) => (
          <button
            key={option.value}
            className={`circle-button ${selectedOption === option.value ? 'selected' : ''}`}
            onClick={() => handleOptionSelect(option.value)}
          >
            {option.label}
          </button>
        ))}
      </div>
      
      <AnimatePresence>
        {selectedOption === 'direct' && (
          <motion.div 
            className="custom-input-container"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <input
              type="number"
              value={customCount}
              onChange={(e) => setCustomCount(e.target.value)}
              placeholder="인원 수 입력"
              className="custom-input"
            />
          </motion.div>
        )}
      </AnimatePresence>
      
      <div className="navigation-buttons">
        <button className="to-back" onClick={onBack}>
          ◀ 이전
        </button>
        <button className="to-next" disabled={isDisabled} onClick={handleNext}>
          다음 ▶
        </button>
      </div>
    </motion.div>
  );
};

export default PeopleCount;
