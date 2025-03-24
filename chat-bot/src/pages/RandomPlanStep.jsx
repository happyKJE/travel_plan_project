/**
 * @file RandomPlanStep.jsx
 * @description 랜덤 플랜을 위한 옵션 표출 컨포넌트
 * @author jaeyeol
 * @created 2025-03-11
 * @lastModifiedBy jaeyeol
 * @lastModifiedDate 2025-03-20
 */

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Wheel } from 'react-custom-roulette'
import useStore from "../context/UseStore.jsx";
import '../styles/RandomPlanStep.css'
import NavigationButtons from "../components/NavigationButtons.jsx";
import { locations, islands, cultural } from '../data/randomLocations.js';

const RandomPlanStep = () => {
    const navigate = useNavigate();
    const { state, dispatch } = useStore();

    const [mustSpin, setMustSpin] = useState(false);
    const [prizeNumber, setPrizeNumber] = useState(0);
    const [rouletteOptions, setRouletteOptions] = useState([]);
    const [mode, setMode] = useState("location");

    const isDisabled = !state.inputValues.region;

    const getFontSize = (text) => {
        if (text.length > 12) return 12;
        if (text.length > 8) return 15;
        return 18;
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
            option: item,
            style: { fontSize: getFontSize(item) }
        }));
    };

    const loadOptions = () => {
        let data;
        if (mode === 'location') data = locations;
        else if (mode === 'island') data = islands;
        else if (mode === 'cultural') data = cultural;
    
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
        const newPrize = Math.floor(Math.random() * rouletteOptions.length);
        setPrizeNumber(newPrize);
        setMustSpin(true);
    };

    const handleStopSpinning = () => {
        setMustSpin(false);
        console.log("룰렛 결과 : ", rouletteOptions[prizeNumber].option)
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
            <div className='Roulette-box'>
                {rouletteOptions.length > 0 && (
                    <Wheel
                        mustStartSpinning={mustSpin}
                        prizeNumber={prizeNumber}
                        data={rouletteOptions}
                        onStopSpinning={handleStopSpinning}
                    />
                )}
                <div className='roulette-type'>
                    <button
                        className={mode === 'location' ? 'selected' : ''}
                        onClick={() => setMode('location')}
                    >
                        전국~~
                    </button>
                    <button
                        className={mode === 'island' ? 'selected' : ''}
                        onClick={() => setMode('island')}
                    >
                        섬도 가능?
                    </button>
                    <button
                        className={mode === 'cultural' ? 'selected' : ''}
                        onClick={() => setMode('cultural')}
                    >
                        나의문화유산답
                    </button>
                </div>
            </div>

            <button
                onClick={handleSpinClick}
                disabled={mustSpin}
            >
                돌려돌려 돌림판
            </button>

            <NavigationButtons
                onBack={() => navigate('/dates-selection')}
                onNext={() => navigate('/chat')}
                onDisabled={isDisabled}
            />

        </motion.div>
    );
};

export default RandomPlanStep;
