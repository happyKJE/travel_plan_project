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