/**
 * @file ModalProvider.jsx
 * @description 백그라운드 이미지 애니메이션 효과 (스크롤 이동 적용)
 * @author jaeyeol
 * @created 2025-03-11
 * @lastModifiedBy jungeun
 * @lastModifiedDate 2025-03-21
 */

import { createContext, useContext, useState } from 'react';
import {useNavigate} from "react-router-dom";
import '../styles/ModalProvider.css';

const ModalContext = createContext();

export const useModal = () => useContext(ModalContext);

export const ModalProvider = ({ children }) => {
    const [modal, setModal] = useState({ isOpen: false, content: null, redirect: null  });
    const navigate = useNavigate();

    const showModal = (content, redirect = null) => {
        setModal({ isOpen: true, content, redirect });
    };

    const closeModal = () => {
        setModal({ isOpen: false, content: null, redirect: null });
        if (modal.redirect) {
            navigate(modal.redirect);
        }
    };

    return (
        <ModalContext.Provider value={{ showModal, closeModal }}>
            {children}
            {modal.isOpen && (
                <div className="modal-backdrop">
                    <div className="modal-content">
                        {modal.content}
                        <button onClick={closeModal}>확인</button>
                    </div>
                </div>
            )}
        </ModalContext.Provider>
    );
};
