import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/Header.css";
import logoImg from "../assets/images/logo_wheretogo.png";
import useStore from "../context/UseStore.jsx";
import {useModal} from "./ModalProvider.jsx";

const Header = () => {
    const navigate = useNavigate();
    const hoverLineRef = useRef(null);
    const navRef = useRef(null);
    const [lineStyle, setLineStyle] = useState({ width: 0, left: 0 });
    const { state,dispatch } = useStore();
    const { showModal } = useModal();

    const handleReset = () => {
        dispatch({ type: "RESET_STATE" }); // 상태 초기화 액션 디스패치
    };

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

    const handleLogout = () => {
        dispatch({ type: "LOGOUT" });
        showModal("로그아웃 되었습니다.", "/",);  // ✅ 모달 띄우고 홈으로 이동
    };

    return (
        <header className="header">
            <div className="logo">
                <img src={logoImg} width="100px" alt="로고" onClick={() => {navigate("/"); handleReset();}} />
            </div>
            <nav ref={navRef} onMouseLeave={handleMouseLeave}>
                <ul className="mainmenu">
                    <li
                        onMouseEnter={handleMouseEnter}
                        onClick={() => {navigate("/"); handleReset();}}
                    >홈</li>

                    <li
                        onMouseEnter={handleMouseEnter}
                        onClick={() => {navigate("/travelReviews") }}
                        className="review-link"
                    >여행 후기</li>
                {state.isLoggedIn ? (
                    <>
                        <li className='loginPageBtn'
                            onMouseEnter={handleMouseEnter}
                            onClick={() => navigate("/mypage")}
                        >마이페이지</li>
                        <button className='logout-btn' onClick={handleLogout}>로그아웃</button>
                    </>
                ) : (
                    <li className='loginPageBtn'
                        onMouseEnter={handleMouseEnter}
                        onClick={() => navigate("/login")}
                    >로그인</li>
                )}
                </ul>

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