/**
 * @file OptionSelector.jsx
 * @description 옵션 데이터 렌더링 컨포넌트
 * @author jaeyeol
 * @created 2025-03-11
 * @lastModifiedBy jungeun
 * @lastModifiedDate 2025-03-12
 */

import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import useStore from "../context/UseStore.jsx";

const OptionSelector = ({ label, type, options }) => {
    const { state, dispatch } = useStore();

    // 선택된 옵션
    const [selected, setSelected] = useState(state.inputValues[type] || null);
    // 직접 입력한 값
    const [inputValue, setInputValue] = useState(
        state.inputValues[type] === "direct" ? state.inputValues[type] : ""
    );

    const handleOptionSelect = (value) => {
        setSelected(value);

        if (value === "direct") {
            setInputValue("");
            value='';
        }
        dispatch({ type: "SET_OPTION", payload: { type, value } });

    };

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleInputBlur = () => {
        if (inputValue.trim() !== "") {
            dispatch({ type: "SET_OPTION", payload: { type, value: inputValue } });
        }
    };

    useEffect(() => {
        //선택 옵션 확인
        console.log(state.inputValues);
        console.log(state.inputValues[type]);
    }, [state.inputValues, type]);

    return (
        <>
            <h2>{label}을 선택하세요.</h2>
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
                        <input
                            type="number"
                            placeholder={`${label}을 입력해주세요.`}
                            className="custom-input"
                            value={inputValue}
                            onChange={handleInputChange}
                            onBlur={handleInputBlur}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default OptionSelector;
