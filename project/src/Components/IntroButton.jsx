import React from 'react'
import { motion } from 'framer-motion'
import Button from './Button'
import '../styles/introButton.css'

const IntroButton = () => {
  return (
    <div className="buttons">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        >
        <Button type="random-plan" text="Random PLAN ▶"  />
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        >
        <Button type="custom-plan" text="Customized Travel PLAN ▶" />
      </motion.div>
    </div> 
  )
}

export default IntroButton
