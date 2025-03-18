/**
 * @file Header.jsx
 * @description 공통 헤더 컴포넌트
 * @author jaeyeol
 * @created 2025-03-11
 * @lastModifiedBy moon
 * @lastModifiedDate 2025-03-17
 */

import React, { useState } from "react";
import "../styles/Header.css";
import logoImg from "../assets/logo_wheretogo.png";
import TravelReviews from "../pages/TravelReviews"; //  오버레이할 컴포넌트 추가

const Header = () => {
  const [showReviews, setShowReviews] = useState(false); //  모달 상태 추가

  return (
    <header className="header">
      <div className="logo">
        <img src={logoImg} width="100px" alt="로고" />
      </div>
      <nav>
        <ul className="mainmenu">
          <li>
            <a href="/">홈</a>
          </li>
          <li>
            <a
              href="#"
              className="review-link"
              onClick={(e) => {
                e.preventDefault();
                setShowReviews(true);
              }}
            >
              여행 후기
            </a>
          </li>
          <li>
            <a href="#">2조화이팅</a>
          </li>
        </ul>
      </nav>
      {/*  여행 후기 모달 (오버레이) */}
      {showReviews && <TravelReviews onClose={() => setShowReviews(false)} />}
    </header>
  );
};

export default Header;
