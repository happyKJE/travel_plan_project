import React from 'react'
import '../styles/ChatBotStart.css'
// import {useNavigate} from "react-router-dom";

const ChatBotStart = (props) => {
    // const navigate = useNavigate();
  return (
    <div className='start-page'>
      {/*<button onClick={()=>navigate('/chatBotApp')} className='start-page-btn'>CHAT-AI</button>*/}
      <button onClick={props.onStartChat} className='start-page-btn'>CHAT-AI</button>
    </div>
  )
}

export default ChatBotStart
 