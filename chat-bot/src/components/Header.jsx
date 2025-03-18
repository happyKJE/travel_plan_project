/**
 * @file Header.jsx
 * @description 공통 헤더 컨포넌트
 * @author jaeyeol
 * @created 2025-03-11
 * @lastModifiedBy jaeyeol
 * @lastModifiedDate 2025-03-11
 */

import React from 'react'
import '../styles/Header.css'
import logoImg from '../assets/logo_wheretogo.png'

const Header = () => {
  return (
    <header className="header">
      <div className="logo"><img src={logoImg} width="100px" alt="" /></div>
      <nav>
        <ul className="mainmenus">
          <li><a href="#" className="mainmenu">홈</a></li>
          <li><a href="#" className="mainmenu">게시판</a></li>
          <li><a href="#" className="mainmenu">여행후기</a></li>
          <li><a href="#" className="mainmenu">2조화이팅</a></li>
        </ul>
      </nav>
    </header>
  )
}

export default Header
