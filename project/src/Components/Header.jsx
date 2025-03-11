import React from 'react'
import '../styles/Header.css'
import logoImg from '../assets/logo_wheretogo.png'

const Header = () => {
  return (
    <header className="header">
      <div className="logo"><img src={logoImg} width="100px" alt="" /></div>
      <nav>
        <ul className="mainmenu">
          <li><a href="#">홈</a></li>
          <li><a href="#">게시판</a></li>
          <li><a href="#">여행후기</a></li>
          <li><a href="#">2조화이팅</a></li>
        </ul>
      </nav>
    </header>
  )
}

export default Header
