/**
 * @file OptionSelector.jsx
 * @description 옵션 데이터 렌더링 컨포넌트
 * @author jaeyeol
 * @created 2025-03-11
 * @lastModifiedBy jungeun
 * @lastModifiedDate 2025-03-21
 */

import React, {useState, useEffect, useRef} from "react";
import { AnimatePresence, motion } from "framer-motion";
import useStore from "../context/UseStore.jsx";
import '../styles/OptionSelector.css';

const OptionSelector = ({ label, type, options }) => {
    const { state, dispatch } = useStore();
    const initialSelected = state.inputValues[type] || null;

    // 직접 입력 값
    const [inputValue, setInputValue] = useState(
        typeof initialSelected === 'number' ? initialSelected : null
    );
    // 선택된 옵션
    const [selected, setSelected] = useState(inputValue?'direct':initialSelected);


  useEffect(() => {
    if (inputValue === null) {
      // const defaultValue = options[0]?.label;
      // setSelected(defaultValue);
      // dispatch({ type: "SET_OPTION", payload: { type, value: defaultValue } });
        setInputValue(1);
    }
  }, []);

  // 옵션 선택 핸들러
  const handleOptionSelect = (label, value) => {
    setSelected(label);
    if (value !== "direct") {
      dispatch({ type: "SET_OPTION", payload: { type, value: label } });
    } else {
      setSelected("direct");
      dispatch({ type: "SET_OPTION", payload: { type, value: inputValue } });
    }
  };

  // input 변경 시 state와 store 동기화
  const handleInputChange = (e) => {
    const newValue = Math.max(1, parseInt(e.target.value, 10) || 1);
    setInputValue(newValue);
    dispatch({ type: "SET_OPTION", payload: { type, value: newValue } });
  };

  // 증감 버튼 클릭 시
  const handleAdjust = (amount) => {
    setInputValue((prev) => {
      const updated = Math.max(1, prev + amount);
      dispatch({ type: "SET_OPTION", payload: { type, value: updated } });
      return updated;
    });
  };

    return (
        <>
            <h3 className='options-header'>{label}을 선택하세요.</h3>
            <div className="options-container">
                {options.map((option) => (
                    <button
                        key={option.value}
                        className={`circle-button ${selected === option.label ? "selected" : ""} ${option.value === "direct" && selected === "direct" ? "selected" : ""}`}
                        onClick={() => handleOptionSelect(option.label, option.value)}
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
                        <button
                            className="number-btn"
                            onClick={() => handleAdjust(-1)}
                        >
                            <img src='/assets/minus.png' alt='-' width={'10px'} />
                        </button>

                        <input
                            type="number"
                            className="custom-input"
                            value={inputValue}
                            onChange={handleInputChange}
                            onBlur={handleInputChange}
                            min={1}
                        />

                        <button
                            className="number-btn"
                            onClick={() => handleAdjust(1)}
                        >
                            <img src='/assets/add.png' alt='+' width={'10px'} />
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default OptionSelector;
