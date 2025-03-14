/**
 * @file PeopleCount.jsx
 * @description 인원 입력 컨포넌트
 * @author jaeyeol
 * @created 2025-03-11
 * @lastModifiedBy jungeun
 * @lastModifiedDate 2025-03-12
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import useStore from '../context/UseStore.jsx';
import {personnelOptions} from "../data/OptionsData.jsx";
import OptionSelector from "../components/OptionSelector.jsx";
import '../styles/PeopleCount.css';
import NavigationButtons from "../components/NavigationButtons.jsx";

const PeopleCount = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useStore();


  return (
    <motion.div 
      className="next-screen" 
      initial={{ y: 50, opacity: 0 }} 
      animate={{ y: 0, opacity: 1 }} 
      transition={{ duration: 1 }}
    >
      <h2>몇 명이서 가시나요?</h2>

      <OptionSelector
          label={"인원"}
          type = '인원'
          options={personnelOptions}
      />

      <NavigationButtons
        onBack={()=> {
          dispatch({ type: 'SELECT_PLAN', payload: null });
          navigate('/plan-selection')
        }}
        onNext={()=>navigate(`/region-selection`)}
      />
    </motion.div>
  );
};

export default PeopleCount;
