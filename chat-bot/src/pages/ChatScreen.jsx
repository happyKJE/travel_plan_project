import React, {useState, useEffect, useRef} from 'react';
import { v4 as uuidv4 } from 'uuid';
import '../styles/ChatBot.css';
import useStore from "../context/UseStore.jsx";
import {placeOptions, transportOptions} from "../data/OptionsData.jsx";

const ChatBot = () => {
    const [showPlane, setShowPlane] = useState(false);
    const [activeChat, setActiveChat] = useState(false);
    const [messages, setMessages] = useState([]);
    const {state} = useStore();
    const inputRef = useRef(null);

    const backgroundImage = `/assets/${state.inputValues.placeOption || "nomatter"}Background.jfif`;
    const initMessage = `2025년 03월 07일부터 2025년 03월 09일까지 ${state.inputValues.personnelOption}명이  ${state.inputValues.region}를 여행을 가.
선호하는 지형은 ${state.inputValues.placeOption}이고, 이동수단은 ${state.inputValues.transportOption}이야.
여행 스타일은 ${state.inputValues.travelSpeedOption === "nomatter" ? "상관없음" : state.inputValues.travelSpeedOption}이야.
일정 추천해줘.`;
    let executed = false; // ✅ 실행 여부를 추적하는 변수 추가

    useEffect(() => {
        if (!executed) {
            sendMessage(initMessage, false);
            executed = true;
        }
    }, []);


  // ✅ 메시지 전송 함수
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputRef.current.value.trim()) return;
    sendMessage(inputRef.current.value, true);
    inputRef.current.value = "";
  };

  // ✅ OpenAI API에 메시지 전송
  const sendMessage = async (userMessage, showUserMessage) => {
    if (!userMessage) return;

    // ✈️ 비행기 애니메이션 시작
    setShowPlane(true);
    setTimeout(() => setShowPlane(false), 3000);

    // ✅ 사용자의 입력 메시지를 채팅창에 추가 (초기 메시지는 추가 X)
    if (showUserMessage) {
      const newMessage = {
        id: uuidv4(),
        type: "prompt",
        text: userMessage,
        timestamp: new Date().toLocaleDateString("ko-KR"),
      };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    }

    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_REACT_APP_CLIENT_ID}`,
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
          messages: [
             { role: "system", content: "너는 여행 플래너야. 반드시 ✅1일차 (날짜 요일) 형식으로 오전, 오후, 저녁, 숙박 계획을 작성해. ✅를 기준으로 줄바꿈 해줘" },
             { role: "user", content: userMessage }
         ],
          max_tokens: 1000,
          temperature: 0.7,
        }),
      });

      const chatResponse = await response.json();
      const botMessage = {
        id: uuidv4(),
        type: "response",
        text: chatResponse.choices[0].message.content,
        timestamp: new Date().toLocaleDateString("ko-KR"),
      };

      // ✅ 새로운 응답 메시지를 추가
      setMessages((prevMessages) => [...prevMessages, botMessage]);

    } catch (error) {
      console.error("Error:", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          id: uuidv4(),
          type: "response",
          text: "죄송합니다. 잠시 후 다시 시도해주세요.",
          timestamp: new Date().toLocaleDateString("ko-KR"),
        },
      ]);
    }
  };


    return (
        <div className="app-container" style={{ backgroundImage: `url(${backgroundImage})` }}>
        {/*<div className="chat-list">*/}
            {/*    <div className="chatbot-image">*/}
            {/*        <img src="https://cdn-icons-png.flaticon.com/512/2040/2040946.png" alt="Cute Robot" />*/}
            {/*    </div>*/}
            {/*    <button className="new-chat-button" onClick={handleNewChat}>*/}
            {/*        <i className="bx bx-plus"></i>*/}
            {/*        새로운 채팅*/}
            {/*    </button>*/}
            {/*    <div className="chat-list-items">*/}
            {/*        {chats.map((chat) => (*/}
            {/*            <div*/}
            {/*                key={chat.id}*/}
            {/*                className={`chat-list-item ${activeChat?.id === chat.id ? 'active' : ''}`}*/}
            {/*            >*/}
            {/*                <div className="chat-item-content" onClick={() => setActiveChat(chat)}>*/}
            {/*                    <i className="bx bx-message-square"></i>*/}
            {/*                    {chat.title}*/}
            {/*                </div>*/}
            {/*                <button*/}
            {/*                    className="delete-chat-button"*/}
            {/*                    onClick={() => handleDeleteChat(chat.id)}*/}
            {/*                >*/}
            {/*                    <i className="bx bx-trash"></i>*/}
            {/*                </button>*/}
            {/*            </div>*/}
            {/*        ))}*/}
            {/*    </div>*/}
            {/*</div>*/}

            <div className="chatbot-container">
                <div className="chatbot-header">
                    <div className="logo"><img width="70px" alt="" src="/src/assets/logo_wheretogo.png"/></div>
                </div>

                <div className="chat-messages">
                    {showPlane && <div className="flying-plane"><i className='bx bxs-plane-alt'></i></div>}
                    {messages.map((message) => (
                        <div
                            key={message.id}
                            className={`message ${message.type === 'prompt' ? 'user-message' : 'bot-message'}`}
                        >
                            {message.text.split('\n').map((line, index) => (
                                <React.Fragment key={index}>
                                  {line}
                                  <br />
                                </React.Fragment>
                              ))}
                        </div>
                    ))}
                </div>

                <div className="chat-input-container">
                    <input
                        type="text"
                        className="chat-input"
                        ref={inputRef}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(e)}
                        placeholder="입력해 주세요"
                    />
                    <button className="send-button" onClick={handleSendMessage}>
                        <i className="bx bx-send"></i>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChatBot;