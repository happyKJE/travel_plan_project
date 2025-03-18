/**
 * @file RandomPlanStep.jsx
 * @description 랜덤 플랜을 위한 옵션 표출 컨포넌트
 * @author jaeyeol
 * @created 2025-03-11
 * @modified disrcription: Roulette ->랜덤플랜추가 
 * @lastModifiedBy Seonah
 * @lastModifiedDate 2025-03-17 
 */

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import NavigationButtons from "../components/NavigationButtons.jsx";
import RouletteWheel from './Roulette';
import { regions } from '../data/RouletteData';
import rouletteData from '../data/RouletteData';

/*모달 컴포넌트: 화면 중앙에 팝업형태로 표시*/
const Modal = ({ isOpen, onClose, children }) => {     /*모달이 열리지 않았다면 아무것도 랜더링하지 않음*/
  if (!isOpen) return null;
    // 화면 전체에 어두운 배경을 만듦.//
  return (
    <div
      style={{
        position: 'fixed', // 화면에 고정!//
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // 반투명 어두운 색//
        display: 'flex',
        justifyContent: 'center',  // 가운데 정렬
        alignItems: 'center', //수직 가운데 정렬//
        zIndex: 1000
      }}
      //모달을 클릭하면 모달이 닫히도록 이벤트 처리//
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '10px',
          maxWidth: '500px',
          width: '90%',
          position: 'relative'
        }}
        onClick={e => e.stopPropagation()}
      >
       // 모달 창 내부의 닫기 버튼//
        <button
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            border: 'none',
            background: 'none',
            fontSize: '20px',
            cursor: 'pointer',
            color: '#666'
          }}
          onClick={onClose}  //버튼을 누르면 모달이 닫힘//
        >
          ✕
        </button>
        {children}    
     </div>
    </div>
  );
};

// 랜덤 여행 계획을 만드는 컴포넌트//
const RandomPlanStep = () => {
  const navigate = useNavigate();  // 다른 페이지로 이동할 수 있게 해줌.//
  const [selectedRegion, setSelectedRegion] = useState(null); //선택된 지역//
  const [selectedPlace, setSelectedPlace] = useState(null); //선택된 관광지//
  const [isModalOpen, setIsModalOpen] = useState(false); //모달이 열려있는지 저장//

  
 // 룰렛을 돌린 후 결과를 받으면 실행되는 함수.// 
  const handleRouletteResult = (result) => {
    setSelectedRegion(result);          //선택된 지역을 저장//
    setSelectedPlace(null);            // 선택된 관광지 초기화//
    
    // 룰렛 데이터에서 선택된 지역을 찾음//
    
    const regionData = rouletteData.find(data => data.region === result);  // 만약 관광지가 있으면,그 중 무작위로 선택//
    if (regionData && regionData.places && regionData.places.length > 0) {
      const randomPlace = regionData.places[Math.floor(Math.random() * regionData.places.length)];
      setSelectedPlace(randomPlace);
    }
    //모달 창을 염//
    setIsModalOpen(true);
  };


  // 다음 버튼을 누르면 채팅 페이지로 이동//
  const handleNext = () => {
    navigate('/chat', { 
      state: { 
        selectedRegion,
        selectedPlace 
      } 
    });
  };
 //애니메이션 효과를 주는 div//
  return (
    <motion.div 
      className="next-screen" //다음 화면//
      initial={{ y: 50, opacity: 0 }} 
      animate={{ y: 0, opacity: 1 }} 
      transition={{ duration: 0.5 }}
      style={{ padding: '20px' }}
    >
      <h2 style={{ marginBottom: '10px' }}>랜덤 지역여행추천</h2>
      
      {/*롤렛 컴포넌트, 옵션은 regions, 결과는 handleRouletteResult*/}
      
      <RouletteWheel options={regions} onResult={handleRouletteResult} />

      {/*모딜 창을 띄워서 선택된 관광지 정보를 보여줌*/})
      
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div style={{ textAlign: 'center' }}>
          {selectedPlace && (
            <div>
              <h4>추천 관광지</h4>
              <p>장소: {selectedPlace.name}</p>
              <p>주소: {selectedPlace.address}</p>
            </div>
          )}
        </div>
      </Modal>

      <NavigationButtons 
        onPrev={() => navigate('/people-count')}
        onNext={handleNext}
        nextDisabled={!selectedRegion}
      />
    </motion.div>
  );
};

export default RandomPlanStep;
