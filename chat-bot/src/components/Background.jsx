/**
 * @file Background.jsx
 * @description 백그라운드 이미지 애니메이션 효과 (스크롤 이동 적용)
 * @author jaeyeol
 * @created 2025-03-11
 * @lastModifiedBy jungeun
 * @lastModifiedDate 2025-03-21
 */

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import "../styles/Background.css";

const Background = () => {
  const bgRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (bgRef.current) {
        // 0.5로 속도 조절
        bgRef.current.style.transform = `translateY(${scrollY * 0.5}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);

    // 컴포넌트 unmount 시 이벤트 제거
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <motion.div
      initial={{ y: -150, opacity: 1 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5, duration: 1.5, ease: "easeInOut" }}
      className="background-container"
      id="background" ref={bgRef}
    />
  );
};

export default Background;
