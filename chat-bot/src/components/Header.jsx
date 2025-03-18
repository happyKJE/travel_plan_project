/**
 * @file Header.jsx
 * @description 공통 헤더 컴포넌트
 * @author jaeyeol
 * @created 2025-03-11
 * @lastModifiedBy moon
 * @lastModifiedDate 2025-03-17
 */

import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import "../styles/Header.css";
import logoImg from "../assets/logo_wheretogo.png";

const Header = () => {
    const navigate = useNavigate();
    return (
        <header className="header">
            <div className="logo">
                <img src={logoImg} width="100px" alt="로고" />
            </div>
            <nav>
                <ul className="mainmenu">
                    <li onClick={()=>navigate("/")}>홈</li>
                    <li onClick={()=>navigate("/travelReviews")} className="review-link">여행 후기</li>
                    <li onClick={()=>navigate("/")}>2조화이팅</li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;