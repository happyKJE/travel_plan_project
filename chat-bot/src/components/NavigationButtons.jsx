/**
 * @file NavigationButtons.jsx
 * @description 옵션페이지 전환 네비게이션 버튼(공통) 컨포넌트
 * @author jaeyeol
 * @created 2025-03-11
 * @lastModifiedBy jungeun
 * @lastModifiedDate 2025-03-12
 */

import React from 'react';

const NavigationButtons = ({ onBack, onNext }) => {
    return (
        <div className="navigation-buttons">
            <button className="to-back" onClick={onBack}>◀ 이전</button>
            <button className='to-next' onClick={onNext}>다음 ▶</button>
        </div>
    );
};

export default NavigationButtons;