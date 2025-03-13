/**
 * @file Background.jsx
 * @description 백그라운드 이미지 에니메이션 효과
 * @author jaeyeol
 * @created 2025-03-11
 * @lastModifiedBy jaeyeol
 * @lastModifiedDate 2025-03-11
 */

import React from "react";
import { motion } from "framer-motion";
import "../styles/Background.css";

const Background = () => {
  return (
    <motion.div
      initial={{ y: -140, opacity: 1 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5, duration: 1.5, ease: "easeInOut" }}
      className="background-container"
    />
  );
};

export default Background;
