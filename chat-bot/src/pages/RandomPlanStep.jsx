/**
 * @file RandomPlanStep.jsx
 * @description 랜덤 플랜을 위한 옵션 표출 컨포넌트(지역,문화재,반려동반선택),결과 텍스로 띄우기
 * @author jaeyeol
 * @created 2025-03-11
 * @lastModifiedBy Sunny
 * @lastModifiedDate 2025-03-26
 */

import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Wheel } from 'react-custom-roulette'
import useStore from "../context/UseStore.jsx";
import '../styles/RandomPlanStep.css'
import NavigationButtons from "../components/NavigationButtons.jsx";
import { locations, islands, cultural, petPlaces, petCulture } from '../data/randomLocations.js';

const RandomPlanStep = () => {
    const navigate = useNavigate();
    const { state, dispatch } = useStore();

    const [mustSpin, setMustSpin] = useState(false);
    const [prizeNumber, setPrizeNumber] = useState(0);
    const [rouletteOptions, setRouletteOptions] = useState(locations);
    const [mode, setMode] = useState("location");

    const isDisabled = !state.inputValues.region;

    const getFontSize = (text) => {
        if (text.length > 20) return 8;
        if (text.length > 15) return 9;
        if (text.length > 12) return 10;
        if (text.length > 8) return 12;
        return 14;
    }

    const getFormattedText = (text) => {
        if (text.length > 15) {
            // 긴 텍스트를 두 줄로 나누기
            const midPoint = Math.floor(text.length / 2);
            const spaceIndex = text.indexOf(' ', midPoint - 3);
            if (spaceIndex !== -1) {
                return text.slice(0, spaceIndex) + '\n' + text.slice(spaceIndex + 1);
            }
        }
        return text;
    }

    function fisherYatesShuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]]; // swap
        }
        return array;
    }

    const getRandomOptions = (dataArray) => {
        const shuffled = fisherYatesShuffle([...dataArray]);
        return shuffled.slice(0, 10).map(item => ({
            option: getFormattedText(item),
            style: {
                fontSize: getFontSize(item),
                textAlign: 'center',
                lineHeight: '1.2'
            }
        }));
    };

    const loadOptions = () => {
        let data;
        if (mode === 'location') data = locations;
        else if (mode === 'island') data = islands;
        else if (mode === 'cultural') data = cultural;
        else if (mode === 'petPlace') data = petPlaces;
        else if (mode === 'petCulture') data= petCulture;
        if (Array.isArray(data) && data.length > 0) {
            const randomOptions = getRandomOptions(data);
            setRouletteOptions(randomOptions);
        } else {
            console.error("❌ 데이터 배열이 비어 있거나 undefined입니다.");
        }
    };

    useEffect(() => {
        loadOptions();
    }, [mode]);

    const handleSpinClick = () => {
        const newPrizeNumber = Math.floor(Math.random() * rouletteOptions.length);
        setPrizeNumber(newPrizeNumber);
        setMustSpin(true);
    };

    const handleStopSpinning = () => {
        setMustSpin(false);
        const result = rouletteOptions[prizeNumber].option;
        console.log("룰렛 결과 : ", result);
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
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <h2>나오는대로 가실꺼죠?</h2>
            <div className="roulette-select-with-icon">
                    <span className="mode-icon">
                        {mode === 'location' && '🌍'}
                        {mode === 'island' && '🏝️'}
                        {mode === 'cultural' && '🏛️'}
                    </span>

                <select value={mode} disabled={mustSpin} onChange={(e) => setMode(e.target.value)}>
                    <option value="location">🗺️전국자치구 250개!!</option>
                    <option value="island">🏝️어디까지 가봤니? 섬ver</option>
                    <option value="cultural">👣나의문화유산답사기</option>
                    <option value="petPlace">🐶달려달려 강아지</option>
                    <option value="petCulture">🐕교양있는 멍멍이</option>
                </select>
            </div>
            <div className='Roulette-box'>
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
            </div>
            <button
                className='spin-btn'
                onClick={handleSpinClick}
                disabled={mustSpin}
            >
                돌려돌려 돌림판
            </button>
            <NavigationButtons
                onBack={() => navigate('/dates-selection')}
                onNext={() => navigate('/chat')}
                onDisabled={isDisabled || mustSpin}
            />

        </motion.div>
    );
};

export default RandomPlanStep;
