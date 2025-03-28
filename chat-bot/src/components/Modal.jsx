/**
 * @file Modal.jsx
 * @description 선택값 표출 모달 컨포넌트
 * @author jaeyeol
 * @created 2025-03-11
 * @lastModifiedBy jaeyeol
 * @lastModifiedDate 2025-03-11
 * @note 
 */

import React from 'react';
import '../styles/Modal.css';
import ToFirstPageButton from './ToFirstPageButton';
import { useNavigate } from 'react-router-dom';
import useStore from '../context/UseStore.jsx';
import PagesIndex from './PagesIndex.jsx';
import { useLocation } from 'react-router-dom';

const Modal = ({ children, onFirstPage  }) => {
    const navigate = useNavigate();
    const { dispatch } = useStore(); // 추가
    const location = useLocation();
    const isMyPagePlan = location.pathname.startsWith('/mypage/plan/');
    const defaultHandler = () => {
        dispatch({ type: 'SELECT_PLAN', payload: null });
        navigate('/plan-selection', { state: { fromModal: true } });
    };

    return (

        <div className="modal-overlay">
            <div className="modal-content">
                <div className='modal-header'>
                    {<PagesIndex />}
                </div>
                <div className="modal-body">
                    <ToFirstPageButton onFirstPage={onFirstPage || defaultHandler} />
                    <div className={`modal-children-wrapper ${isMyPagePlan ? 'scroll-enabled' : ''}`}>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;
