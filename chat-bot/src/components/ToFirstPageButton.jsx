/**
 * @file ToFirstPageButton.jsx
 * @description 옵션페이지에서 첫페이지 돌아가기 버튼(공통) 컨포넌트
 * @author jaeyeol
 * @created 2025-03-17
 * @lastModifiedBy jaeyeol
 * @lastModifiedDate 2025-03-17
 */


import React from 'react';
import '../styles/ToFirstPageButton.css'

const ToFirstPageButton = ({ onFirstPage }) => {
    return (
        <div className='to-first-page'>
            <button className="to-first-page-button" onClick={()=>{
                console.log("첫페이지 이동"); 
                onFirstPage();}}>
                    <i className='bx bx-x' ></i>
            </button>
        </div>
    )
}

export default ToFirstPageButton
