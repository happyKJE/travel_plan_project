import React from 'react'
import './ChatBotStart.css'
import ChatBotApp from "./ChatBotApp.jsx";
import {useNavigate} from "react-router-dom";

const ChatBotStart = () => {
    const navigate = useNavigate();
  return (
    <div className='start-page'>
      <button onClick={()=>navigate('/chatBotApp')} className='start-page-btn'>CHAT-AI</button>
    </div>
  )
}

export default ChatBotStart
 