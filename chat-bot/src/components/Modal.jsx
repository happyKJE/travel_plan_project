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

const Modal = ({ children }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        {children}
      </div>
    </div>
  );
};

export default Modal;
