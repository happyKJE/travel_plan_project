/**
 * @file CustomizedPlanStep.jsx
 * @description 맞춤형 여행을 위한 질문 옵션 표출 컨포넌트
 * @author jaeyeol
 * @created 2025-03-11
 * @lastModifiedBy jungeun
 * @lastModifiedDate 2025-03-12
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import useStore from '../context/UseStore.jsx';
import OptionSelector from "../components/OptionSelector.jsx";
import {placeOptions,travelSpeedOptions,transportOptions} from '../data/OptionsData'
import NavigationButtons from "../components/NavigationButtons.jsx";

const CustomizedPlanStep = () => {
  const navigate = useNavigate();
  const { state } = useStore();

  return (
    <motion.div 
      className="next-screen" 
      initial={{ y: 50, opacity: 0 }} 
      animate={{ y: 0, opacity: 1 }} 
      transition={{ duration: 0.5 }}
    >
      <h2>아래 내용에서 골라주세요</h2>

      <OptionSelector
          label={"여행스타일"}
          type={"travelSpeedOption"}
          options={travelSpeedOptions}
          selected={state.inputValues.speed}
      />
      <OptionSelector
          label={"선호하는 장소"}
          type={"placeOption"}
          options={placeOptions}
          selected={state.inputValues.place}
      />
      <OptionSelector
          label={"이동 수단"}
          type={"transportOption"}
          options={transportOptions}
          selected={state.inputValues.transport}
      />

      <NavigationButtons
          onBack={()=>navigate('/region-selection')}
          onNext={()=>navigate('/chat')}
      />
    </motion.div>
  );
};

export default CustomizedPlanStep;