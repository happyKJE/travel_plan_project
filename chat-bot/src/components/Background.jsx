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
