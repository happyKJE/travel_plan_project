/**
 * @file ToFirstPageButton.jsx
 * @description 옵션페이지에서 첫페이지 돌아가기 버튼(공통) 컨포넌트
 * @author jaeyeol
 * @created 2025-03-17
 * @lastModifiedBy jungeun
 * @lastModifiedDate 2025-03-19
 */


import React from 'react';
import '../styles/ToFirstPageButton.css'
import useStore from '../context/UseStore.jsx';
import {matchPath, useLocation, useNavigate} from "react-router-dom"; // 추가

const ToFirstPageButton = ({ onFirstPage }) => {
    const location = useLocation();
    const navigate = useNavigate()
    const isMyPage = matchPath("mypage/plan/:id", location.pathname);
    const { dispatch } = useStore(); // 추가
    const handleReset = () => {
        dispatch({ type: "RESET_STATE" }); // 상태 초기화 액션 디스패치
    };

    return (
        <div className='to-first-page'>
            <button className="to-first-page-button" onClick={() => {
                console.log("첫페이지 이동");
                window.scrollTo(0, 0); // 스크롤을 맨 위로 이동
                if(!isMyPage){
                    onFirstPage();
                    handleReset();
                }else{
                    navigate(-1);
                    }
            }}>&times;</button>
        </div>
    )
}

export default ToFirstPageButton