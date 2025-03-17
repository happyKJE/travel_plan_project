/**
 * @file RegionSelection.jsx
 * @description 지도 기능 추가
 * @author jaeyeol
 * @created 2025-03-13
 * @lastModifiedBy jaeyeol
 * @lastModifiedDate 2025-03-14
 */


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import NavigationButtons from "../components/NavigationButtons.jsx";
import { Calendar, DateObject } from "react-multi-date-picker";



const DatesSelection = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState([]);

  return (
    <motion.div 
      className="next-screen" 
      initial={{ y: 50, opacity: 0 }} 
      animate={{ y: 0, opacity: 1 }} 
      transition={{ duration: 1 }}
    >
        <h2>기간을 선택하세요</h2>
        <Calendar
            value={values}
            onChange={setValues}
            range
            numberOfMonths={2}
            showOtherDays
        /> 
        <NavigationButtons
            onBack={() => navigate('/people-count')}
            onNext={() => navigate('/Region-Selection')}
        />
    </motion.div>
  );
};

export default DatesSelection;
