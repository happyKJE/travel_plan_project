/**
 * @file ToFirstPageButton.jsx
 * @description 옵션페이지에서 첫페이지 돌아가기 버튼(공통) 컨포넌트
 * @author jaeyeol
 * @created 2025-03-17
 * @lastModifiedBy jaeyeol
 * @lastModifiedDate 2025-03-17
 */


import React from 'react';
import useStore from '../context/UseStore.jsx'; // 추가

const ToFirstPageButton = ({ onFirstPage }) => {
    const { dispatch } = useStore(); // 추가
    const handleReset = () => {
        dispatch({ type: "RESET_STATE" }); // 상태 초기화 액션 디스패치
    };

    return (
        <div className='to-first-page'>
            <button className="to-first-page-button" onClick={() => {
                console.log("첫페이지 이동");
                handleReset();
                onFirstPage();
            }}>
                <i className='bx bx-x' ></i>
            </button>
        </div>
    )
}

export default ToFirstPageButton