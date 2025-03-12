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
  const { state } = useStore();


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
          type = 'personnel'
          options={personnelOptions}
      />

      <NavigationButtons
        onBack={()=>navigate('/plan-selection')}
        onNext={()=>navigate(`/plan-details/${state.planType}`)}
      />
    </motion.div>
  );
};

export default PeopleCount;
