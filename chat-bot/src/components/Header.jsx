import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/Header.css";
import logoImg from "../assets/logo_wheretogo.png";

const Header = () => {
    const navigate = useNavigate();
    const hoverLineRef = useRef(null);
    const navRef = useRef(null);
    const [lineStyle, setLineStyle] = useState({ width: 0, left: 0 });

    const handleMouseEnter = (e) => {
        const target = e.target;
        const navLeft = navRef.current.getBoundingClientRect().left;
        const itemLeft = target.getBoundingClientRect().left - navLeft;
        setLineStyle({
            width: target.offsetWidth,
            left: itemLeft,
        });
    };

    const handleMouseLeave = () => {
        setLineStyle({ width: 0, left: 0 });
    };
    return (
        <header className="header">
            <div className="logo">
                <img src={logoImg} width="100px" alt="로고" onClick={() => navigate("/")} />
            </div>
            <nav ref={navRef} onMouseLeave={handleMouseLeave}>
                <ul className="mainmenu">
                    <li
                        onMouseEnter={handleMouseEnter}
                        onClick={() => navigate("/")}
                    >홈</li>

                    <li
                        onMouseEnter={handleMouseEnter}
                        onClick={() => navigate("/travelReviews")}
                        className="review-link"
                    >여행 후기</li>

                    <li
                        onMouseEnter={handleMouseEnter}
                        onClick={() => navigate("/")}
                    >2조화이팅</li>
                </ul>

                {/* 움직이는 hover bar */}
                <div
                    ref={hoverLineRef}
                    className="hover-line"
                    style={{
                        width: `${lineStyle.width}px`,
                        left: `${lineStyle.left}px`
                    }}
                />
            </nav>
        </header>
    );
};

export default Header;