/**
 * @file RandomPlanStep.jsx
 * @description 랜덤 플랜을 위한 옵션 표출 컨포넌트(지역,문화재,반려동반선택)
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
import { locations, cultural, petPlaces, petCulture } from '../data/randomLocations.js';

const RandomPlanStep = () => {
    const navigate = useNavigate();
    const { state, dispatch } = useStore();

    const [mustSpin, setMustSpin] = useState(false);
    const [prizeNumber, setPrizeNumber] = useState(0);
    const [rouletteOptions, setRouletteOptions] = useState([]);
    const [mode, setMode] = useState("location");
    const [selectedPlace, setSelectedPlace] = useState(null);

    const isDisabled = !state.inputValues.region;

    //텍스 길이에 따른 폰트 사이즈 조절//
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
        setSelectedPlace(result);
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
            <div className="roulette-container">
                <div className="roulette-content">
                    {rouletteOptions.length > 0 && (
                        <Wheel
                            mustStartSpinning={mustSpin}
                            prizeNumber={prizeNumber}
                            data={rouletteOptions}
                            onStopSpinning={handleStopSpinning}

                        // 세련된 컬러 조합 (블루-민트 그라데이션 느낌)
                            backgroundColors={[
                                '#c6fffd', '#cdffde', '#ffecd3', '#ffe7e7', '#A0E7E5',
                                '#c3ffd4', '#ffdda6', '#ffb0bb', '#aafffb', '#B4F8C8'
                            ]}

                        // 폰트 감성적으로 변경
                            fontFamily="Pretendard, 'Helvetica Neue', sans-serif"
                            textColors={['rgba(2,56,83,0.7)']}

                        // 테두리 컬러 은은하게 변경
                            outerBorderColor={'#80C4FF'}
                            outerBorderWidth={6}

                        // 반투명한 라인으로 고급스럽게
                            radiusLineColor={'rgba(73, 84, 236, 0.3)'}
                            radiusLineWidth={2}

                        // 폰트 사이즈 조금 키우기
                            fontSize={18}
                        />
                    )}
                </div>
                <div className='roulette-type'>
                    <button
                        className={mode === 'location' ? 'selected' : ''}
                        onClick={() => setMode('location')}
                    >
                        전국 방방곳곳에 가요
                    </button>
                    <button
                        className={mode === 'cultural' ? 'selected' : ''}
                        onClick={() => setMode('cultural')}
                    >
                        문화를 즐겨요 
                    </button>
                    <button
                        className={mode === 'petPlace' ? 'selected' : ''}
                        onClick={() => setMode('petPlace')}
                    >
                        반려동물과 함께 공원에 가요
                    </button> 
                    <button
                        className={mode === 'petCulture' ? 'selected' : ''}
                        onClick={() => setMode('petCulture')}
                    >
                        반려동물과 함께 문화를 즐겨요
                    </button> 
                </div>
            </div>
            {/*룰렛 결과로 선택된 장소를 화면에 띄워주는 텍스트*/}
            <div className="roulette-controls">
                {selectedPlace && (
                    <div className="result-text">
                        🎯 선택된 여행지: <span>{selectedPlace}</span>
                    </div>
                )}
                <button
                    className="spin-button"
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
