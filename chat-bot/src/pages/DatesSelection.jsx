/**
 * @file RegionSelection.jsx
 * @description 지도 기능 추가
 * @author jaeyeol
 * @created 2025-03-13
 * @lastModifiedBy jaeyeol
 * @lastModifiedDate 2025-03-14
 */

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar } from "react-multi-date-picker";
import moment from "moment"; // 날짜 처리를 위한 moment 라이브러리 추가
import useStore from "../context/UseStore.jsx";
import NavigationButtons from "../components/NavigationButtons.jsx";
import "../styles/DatesSelection.css"; // 추가한 CSS 파일을 불러오기

const DatesSelection = () => {
    const navigate = useNavigate();
    const [values, setValues] = useState([]);
    const { state, dispatch } = useStore();

    // 날짜 변경 이벤트 핸들러
    const handleDateChange = (dates) => {
        const formattedDates = dates.map(date => date.format("YYYY-MM-DD"));
        setValues(formattedDates); // 상태 업데이트
    };

    // values가 변경될 때마다 최신 값을 dispatch에 반영
    useEffect(() => {
        if (values.length > 0) {
            dispatch({
                type: "SET_OPTION",
                payload: { type: "selectedDates", value: values }
            });
        }
    }, [values]); // values가 변경될 때 실행

    useEffect(() => {
        console.log("Global state updated:", state);
    }, [state]);

    return (
        <motion.div
            className="next-screen"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1 }}
        >
            <h2>기간을 선택하세요</h2>
            <Calendar
                value={values}
                onChange={handleDateChange}
                range
                numberOfMonths={2}
                showOtherDays
                locale="ko" // 한글 로케일 적용
                format="YYYY-MM-DD" // 날짜 형식도 한글 적용
                weekDays={["일", "월", "화", "수", "목", "금", "토"]} // 요일 한글 적용
                months={[
                    "1월", "2월", "3월", "4월", "5월", "6월",
                    "7월", "8월", "9월", "10월", "11월", "12월"
                ]} // 월 한글 적용
                minDate={moment().format("YYYY-MM-DD")} // 오늘 날짜부터 선택 가능하게 설정
            />
            <NavigationButtons
                onBack={() => navigate('/people-count')}
                onNext={() => navigate('/Region-Selection')}
            />
        </motion.div>
    );
};

export default DatesSelection;
