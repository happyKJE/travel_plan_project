import React, {useRef, useState} from "react";
import {AnimatePresence, motion} from "framer-motion";
import useStore from "../context/UseStore.jsx";

const OptionSelector = ({ label,type, options}) => {
    const inputRef = useRef(null);
    const { state, dispatch } = useStore();
    const [selected, setSelected] = useState(null);

    const handleOptionSelect = (type,value) => {
        setSelected(value);
        dispatch({ type: "SET_OPTION", payload: {type:type,value:value } });
        console.log(state.inputValues)
    };

    return (
        <>
            <h2>{label}을 선택하세요.</h2>
            <div className="options-container">
                {options.map((option) => (
                        <button
                            value={option.value}
                            className={`circle-button ${selected === option.value ? 'selected' : ''}`}
                            onClick={() => handleOptionSelect(type,option.value)}
                        >
                        {option.label}
                        </button>
                ))}
            </div>

            <AnimatePresence>
                {selected === 'direct' && (<motion.div
                        aria-disabled={"false"}
                        className="custom-input-container"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <input
                            type="number"
                            ref={inputRef}
                            placeholder={`${label}을 입력해주세요.`}
                            className="custom-input"
                            min={1}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default OptionSelector;
