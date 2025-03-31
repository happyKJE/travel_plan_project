import React, { useEffect, useState } from "react";
import "../styles/Background.css";
import { useLocation } from "react-router-dom";

const Background = () => {
  const [show, setShow] = useState(true);
  const location = useLocation();

  const isHiddenPage = ["/login", "/join"].includes(location.pathname) || location.pathname.startsWith("/mypage");


  //경로 바뀌면 show 변경
  useEffect(() => {
    setShow(!isHiddenPage);
  }, [isHiddenPage]);

  //스크롤 이벤트
  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setShow(false);
      } else if (currentScrollY < lastScrollY && currentScrollY <= 80 && !isHiddenPage) {
        setShow(true);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isHiddenPage]);

  return (
    <div
      className="background-container"
      style={{
        opacity: show ? 1 : 0,
        transition: "opacity 1.5s ease",
        pointerEvents: show ? "auto" : "none",
      }}
    />
  );
};

export default Background;
