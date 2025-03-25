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
import { motion } from 'framer-motion';

const Modal = ({ children }) => {
    const navigate = useNavigate();
    const { dispatch } = useStore(); // 추가

    return (

        <div className="modal-overlay">
            <div className="modal-content">
                <div className='modal-header'>
                    {<PagesIndex />}
                </div>
                <div className='modal-body'>
                    <ToFirstPageButton onFirstPage={() => {
                        dispatch({ type: 'SELECT_PLAN', payload: null }); // 오류 해결
                        navigate('/plan-selection', { state: { fromModal: true } });
                    }} />
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Modal;
