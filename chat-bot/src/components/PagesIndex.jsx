/**
 * @file IntroSection.jsx
 * @description 공통 메인화면 인트로 문구
 * @author jaeyeol
 * @created 2025-03-11
 * @lastModifiedBy jaeyeol
 * @lastModifiedDate 2025-03-11
 */

import React from 'react'
import useStore from '../context/UseStore.jsx';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';

const PagesIndex = () => {
    const { state } = useStore();
    const navigate = useNavigate();
    const location = useLocation(); // 현재 라우트 정보 가져오기

    return (
        <motion.div 
            key={location.pathname} // 🔹 라우트 변경 시 새로운 요소로 인식되도록 설정
            className='index-number'
            initial={{ y: 0, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1 }}
        >
            {state.planType === 'custom' ? (
                <ul>
                    <li 
                        className={`tab ${location.pathname === '/people-count' ? 'active' : 'inactive'}`} 
                    >
                        1. 인원
                    </li>
                    <li 
                        className={`tab ${location.pathname === '/dates-selection' ? 'active' : 'inactive'}`} 
                    >
                        2. 일정
                    </li>
                    <li 
                        className={`tab ${location.pathname === '/region-selection' ? 'active' : 'inactive'}`} 
                    >
                        3. 지역
                    </li>
                    <li 
                        className={`tab ${location.pathname === '/plan-details/custom' ? 'active' : 'inactive'}`} 
                    >
                        4. 여행스타일
                    </li>
                </ul>
            ) : state.planType === 'random' ? (
                <ul>
                    <li 
                        className={`tab ${location.pathname === '/dates-selection' ? 'active' : 'inactive'}`} 
                    >
                        1. 일정
                    </li>
                    <li 
                        className={`tab ${location.pathname === '/plan-details/random' ? 'active' : 'inactive'}`} 
                    >
                        2. 돌림판
                    </li>
                </ul>
            ) : null}
        </motion.div>
    )
}

export default PagesIndex;
