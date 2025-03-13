import React from 'react'
import {motion} from 'framer-motion'

import BackgroundIMG from '../assets/background_cloud.jpg'

const Background = () => {
  return (
    <motion.div
      initial={{ y: -140, opacity: 1 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay:0.5, duration: 1.5, ease: 'easeInOut' }}
      className="background-container"
    >
      {<img src={BackgroundIMG} width="100%" alt="" />}
    </motion.div>
  )
}

export default Background
