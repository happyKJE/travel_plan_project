/**
 * @file OptionSelector.jsx
 * @description 옵션 데이터 렌더링 컨포넌트
 * @author jaeyeol
 * @created 2025-03-11
 * @lastModifiedBy jungeun
 * @lastModifiedDate 2025-03-21
 */

import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import useStore from "../context/UseStore.jsx";
import '../styles/OptionSelector.css';

const OptionSelector = ({ label, type, options }) => {
    const { state, dispatch } = useStore();

    const initialSelected = state.inputValues[type] || "";
    // 선택된 옵션
    const [selected, setSelected] = useState(state.inputValues[type] || []);
    // 직접 입력한 값
    const [inputValue, setInputValue] = useState(initialSelected === "direct" ? "" : initialSelected);

    const handleOptionSelect = (value) => {
        const selectedOption = options.find(option=>option.value===value).label;
        setSelected(value);

        if (value !== "direct") {
            dispatch({ type: "SET_OPTION", payload: { type, value:selectedOption } });
        }else {
            setInputValue("");
            dispatch({ type: "SET_OPTION", payload: { type, value: "" } });
        }
    };

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleInputBlur = () => {
        const trimmedValue = inputValue.trim();
        if (trimmedValue) {
            dispatch({ type: "SET_OPTION", payload: { type, value: trimmedValue } });
        }
    };

    useEffect(() => {
        //선택 옵션 확인
        console.log(state.inputValues);
        console.log(state.inputValues[type]);
    }, [state.inputValues]);

    return (
        <>
            <h3 className='options-header'>{label}을 선택하세요.</h3>
            <div className="options-container">
                {options.map((option) => (
                    <button
                        key={option.value}
                        className={`circle-button ${selected === option.value ? "selected" : ""}`}
                        onClick={() => handleOptionSelect(option.value)}
                    >
                        {option.label}
                    </button>
                ))}
            </div>

            <AnimatePresence>
                {selected === "direct" && (
                    <motion.div
                        className="custom-input-container"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <button className="number-btn" onClick={() => setInputValue(prev => Math.max(1, Number(prev) - 1))}>
                            <img src='/assets/minus.png' alt='-' width={'10px'}/>
                        </button>
                        <input
                          type="number"
                          className="custom-input"
                          value={inputValue}
                          onChange={handleInputChange}
                          onBlur={handleInputBlur}
                          placeholder={`${label} 수`}
                          min={1}
                        />

                        <button className="number-btn" onClick={() => setInputValue(prev => Number(prev) + 1)}>
                            <img src='/assets/add.png' alt='+' width={'10px'}/>
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default OptionSelector;
