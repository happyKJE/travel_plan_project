import React, { useEffect, useState } from "react";
import "../styles/Background.css";
import {useLocation} from "react-router-dom";

const Background = () => {
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const location = useLocation();
  const isVisible = (location.pathname === "/login") ||(location.pathname === "/join") ||
                            (location.pathname === "/mypage");

  const handleScroll = () => {
    const currentScrollY = window.scrollY;
    
    if (currentScrollY > lastScrollY && currentScrollY > 50 ) {
      // 아래로 스크롤하면 숨김
      setShow(false);
    } else if (currentScrollY < lastScrollY && currentScrollY < 80 && !isVisible) {
      // 위로 스크롤해도 300 이하로 올라오면 보임
      setShow(true);
    }

    setLastScrollY(currentScrollY);
  };
  
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);


  return (
    <div
      className="background-container"
      style={{
        opacity: show ? 1 : 0,
        transition: "opacity 1.5s ease",
        pointerEvents: show ? 'auto' : 'none', 
      }}
    >
    </div>
  );
};

export default Background;
