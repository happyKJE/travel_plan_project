/**
 * @file RandomPlanStep.jsx
 * @description 랜덤 플랜을 위한 옵션 표출 컨포넌트
 * @author jaeyeol
 * @created 2025-03-11
 * @lastModifiedBy jaeyeol
 * @lastModifiedDate 2025-03-20
 */

import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Wheel } from 'react-custom-roulette'
import useStore from "../context/UseStore.jsx";
import NavigationButtons from "../components/NavigationButtons.jsx";
import locations from '../data/locationsData.js';
import '../styles/Roulette.css'

const RandomPlanStep = () => {
    const navigate = useNavigate();
    const { state, dispatch } = useStore();
    const [mustSpin, setMustSpin] = useState(false);
    const [prizeNumber, setPrizeNumber] = useState(0);
    const [rouletteOptions, setRouletteOptions] = useState([]);
    const isDisabled = !state.inputValues.region;

    const getRandomLocations = () => {
        const shuffled = [...locations].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, 10).map(location => ({ option: location }));
    };

    useEffect(() => {
        if (Array.isArray(locations) && locations.length > 0) {
            const randomLocations = getRandomLocations();
            console.log("랜덤으로 선택된 장소 목록: ", randomLocations);
            setRouletteOptions(randomLocations);
        } else {
            console.error("❌ locations 배열이 비어 있거나 undefined입니다.");
        }
    }, []);

    const handleSpinClick = () => {
        const newPrizeNumber = Math.floor(Math.random() * rouletteOptions.length);
        setPrizeNumber(newPrizeNumber);
        setMustSpin(true);
    };

    const handleStopSpinning = () => {
        setMustSpin(false);
        console.log("룰렛 결과 : ",rouletteOptions[prizeNumber].option)
    };

    useEffect(() => {
        if (!mustSpin && rouletteOptions.length > 0 && rouletteOptions[prizeNumber]) {
            dispatch({
                type: "SET_OPTION",
                payload: { type: "region", value: rouletteOptions[prizeNumber].option }
            });
        }
    }, [mustSpin]);

    useEffect(() => {
        console.log("Global state updated:", state);
    }, [state]);


    return (
        <motion.div
            className="next-screen"
            initial={{y: 50, opacity: 0}}
            animate={{y: 0, opacity: 1}}
            transition={{duration: 0.5}}
        >
            <h2>나오는대로 가실꺼죠?</h2>
                <div className="roulette-container">
                    {rouletteOptions.length > 0 && (
                        <Wheel
                            mustStartSpinning={mustSpin}
                            prizeNumber={prizeNumber}
                            data={rouletteOptions}
                            onStopSpinning={handleStopSpinning}

                            // ✅ 세련된 컬러 조합 (블루-민트 그라데이션 느낌)
                            backgroundColors={[
                                '#c6fffd', '#cdffde', '#ffecd3', '#ffe7e7', '#A0E7E5',
                                '#c3ffd4', '#ffdda6', '#ffb0bb', '#aafffb', '#B4F8C8'
                            ]}

                            // ✅ 폰트 감성적으로 변경
                            fontFamily="Pretendard, 'Helvetica Neue', sans-serif"
                            textColors={['rgba(2,56,83,0.7)']}

                            // ✅ 테두리 컬러 은은하게 변경
                            outerBorderColor={'#80C4FF'}
                            outerBorderWidth={6}

                            // ✅ 반투명한 라인으로 고급스럽게
                            radiusLineColor={'rgba(73, 84, 236, 0.3)'}
                            radiusLineWidth={2}

                            // ✅ 폰트 사이즈 조금 키우기
                            fontSize={18}
                        />

                    )}
                    <button
                        onClick={handleSpinClick}
                        disabled={mustSpin}
                    >
                        돌려돌려 돌림판
                    </button>
                </div>
                <NavigationButtons
                    onBack={() => navigate('/dates-selection')}
                    onNext={() => navigate('/chat')}
                    onDisabled={isDisabled}
                />

        </motion.div>
);
};

export default RandomPlanStep;
