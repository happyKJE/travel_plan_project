/**
 * @file RegionSelection.jsx
 * @description 지도 기능 추가
 * @author jaeyeol
 * @created 2025-03-13
 * @lastModifiedBy jaeyeol
 * @lastModifiedDate 2025-03-14
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import NavigationButtons from "../components/NavigationButtons.jsx";
import { Calendar } from "react-multi-date-picker";
import "../styles/Calendar.css"; // 추가한 CSS 파일을 불러오기

const DatesSelection = () => {
    const navigate = useNavigate();
    const [values, setValues] = useState([]);

    const handleDateChange = (dates) => {
        // 날짜를 문자열로 변환
        const formattedDates = dates.map(date => date.format("YYYY-MM-DD"));
        setValues(formattedDates);
    };

    console.log("values : ", values)

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
            /> 
            <NavigationButtons
                onBack={() => navigate('/people-count')}
                onNext={() => navigate('/Region-Selection')}
            />
        </motion.div>
    );
};

export default DatesSelection;
