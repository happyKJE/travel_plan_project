/**
 * @file RegionSelection.jsx
 * @description 달력 기능 추가
 * @author jaeyeol
 * @created 2025-03-13
 * @lastModifiedBy jungeun
 * @lastModifiedDate 2025-03-20
 */

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/style.css';
import useStore from "../context/UseStore.jsx";
import NavigationButtons from "../components/NavigationButtons.jsx";
import "../styles/DatesSelection.css";

const DatesSelection = () => {
    const { state, dispatch } = useStore();
    const navigate = useNavigate();
    const isOneDayTrip = state.inputValues?.selectedDates[0] === state.inputValues?.selectedDates[1];

    const [values, setValues] = useState(() => {
        const savedDates = state.inputValues?.selectedDatesISO;
        return savedDates && savedDates.length === 2
            ? { from: new Date(savedDates[0]), to: new Date(savedDates[1]) }
            : { from: undefined, to: undefined };
    });

    const isDisabled = !(values.from && values.to);

    //날짜 저장
    useEffect(() => {
        if (values.from && values.to) {
            // 한국 시간 기준 저장용 포맷 함수
            const formatDate = (date) => {
                const year = date.getFullYear();
                const month = (`0${date.getMonth() + 1}`).slice(-2);
                const day = (`0${date.getDate()}`).slice(-2);
                return `${year}-${month}-${day}`;
            };

            dispatch({
                type: "SET_OPTION",
                payload: {
                    type: "selectedDates",
                    value: [
                        formatDate(values.from),
                        formatDate(values.to)
                    ]
                }
            });

            // 날짜 유지용 ISO 포맷도 저장해두고 싶다면 따로 저장
            dispatch({
                type: "SET_OPTION",
                payload: {
                    type: "selectedDatesISO",
                    value: [
                        values.from.toISOString(),
                        values.to.toISOString()
                    ]
                }
            });
        }
    }, [values]);

    useEffect(() => {
        console.log("Global state updated:", state);
    }, [state]);

    //날짜 선택 범위 제한
    const handleSelect = (range) => {
        if (!range) return;

        // 같은 날짜 두 번 클릭 시 range.to 초기화 (or 단일 선택 처리)
        if (range.from && range.to && range.from.getTime() === range.to.getTime()) {
            setValues({ from: range.from, to: range.from });  // 같은 날짜 두 번 클릭해도 유지
            return;
        }

        // 최대 10일 제한
        if (range?.from && range?.to) {
            const diff = (range.to - range.from) / (1000 * 60 * 60 * 24);
            if (diff > 10) {
                setShowAlert(true);
                return;
            }
        }
        setValues(range);
    };

    const handleOnNext = () => {
        navigate(state.planType === 'custom' ? '/region-selection' : '/plan-details/random');
    };

    const footer = values?.from && values?.to
        ? `여행 기간: ${isOneDayTrip
            ? `${values.from.toLocaleDateString('ko-KR')}`
            : `${values.from.toLocaleDateString('ko-KR')} ~ ${values.to.toLocaleDateString('ko-KR')}  `
        }`
        : '여행 시작일과 종료일을 선택하세요.';
    return (
        <motion.div
            className="next-screen"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1 }}
        >
            <h2 className='option-header'>기간은 어떻게 되시나요?</h2>
            <p>최대 10일까지 일정 선택</p>
            <div className="calendar-container">
                <DayPicker
                    mode="range"
                    selected={values}
                    onSelect={handleSelect}
                    numberOfMonths={2}
                    pagedNavigation
                    weekStartsOn={0} // 일요일 시작
                    disabled={{ before: new Date() }}
                    modifiersClassNames={{
                        selected: 'my-selected',
                        today: 'my-today',
                        range_middle: 'my-range-middle'
                    }}
                    formatters={{
                        formatCaption: (date) => `${date.getFullYear()}년 ${date.getMonth() + 1}월`,
                        formatWeekdayName: (day) => ['일', '월', '화', '수', '목', '금', '토'][day.getDay()],
                    }}
                    footer={footer}
                />
            </div>
            <NavigationButtons
                onBack={() => navigate('/people-count')}
                onNext={handleOnNext}
                onDisabled={isDisabled}
            />
        </motion.div>
    );
};

export default DatesSelection;
