// App.jsx
import React, { useState } from 'react';
import Header from './Components/Header';
import IntroSection from './Components/IntroSection';
import Background from './Components/Background';
import PlanSelection from './pages/PlanSelection';
import PeopleCount from './pages/PeopleCount';
import RandomPlanStep from './pages/RandomPlanStep';
import CustomizedPlanStep from './pages/CustomizedPlanStep';
import ChatScreen from './pages/ChatScreen';
import Modal from './Components/Modal';

const App = () => {
  // 단계: 1 - 플랜 선택, 2 - 인원수 입력, 3 - 플랜 상세 입력, 4 - 챗봇 화면
  const [step, setStep] = useState(1);
  // 선택한 플랜 타입: 'random' 또는 'custom'
  const [planType, setPlanType] = useState(null);
  // 각 스텝에서 입력한 값들을 저장
  const [inputValues, setInputValues] = useState({});

  // Step 1: 플랜 선택 후 호출
  const handlePlanSelect = (selectedPlan) => {
    setPlanType(selectedPlan);
    setStep(2);
  };

  // Step 2: 인원수 입력 후 호출
  const handlePeopleCountNext = (data) => {
    setInputValues(prev => ({ ...prev, ...data }));
    setStep(3);
  };

  // Step 3: 플랜 상세 입력 후 호출
  const handleStepThreeNext = (data) => {
    setInputValues(prev => ({ ...prev, ...data }));
    setStep(4);
  };

  // 이전 버튼 클릭 시 이전 스텝으로 이동하는 함수
  const handleBack = () => {
    setStep(prevStep => prevStep - 1);
  };

  return (
    <div>
      <Header />
      <main>
        <IntroSection />
        {step === 1 && <PlanSelection onSelectPlan={handlePlanSelect} />}
        
        {/* 플랜 선택 후에는 모달 내에서 다음 단계 진행 */}
        {step > 1 && (
          <Modal>
            {step === 2 && <PeopleCount onNext={handlePeopleCountNext} onBack={handleBack} />}
            {step === 3 && planType === 'random' && (
              <RandomPlanStep onNext={handleStepThreeNext} onBack={handleBack} />
            )}
            {step === 3 && planType === 'custom' && (
              <CustomizedPlanStep onNext={handleStepThreeNext} onBack={handleBack} />
            )}
            {step === 4 && <ChatScreen inputValues={inputValues} onBack={handleBack} />}
          </Modal>
        )}
        <Background />
      </main>
      <footer></footer>
    </div>
  );
};

export default App;
