/**
 * @file RandomPlanStep.jsx
 * @description chatbot 대화창
 * @author jungeun
 * @created 2025-03-21
 * @lastModifiedBy jungeun
 * @lastModifiedDate 2025-03-21
 */

import React, { useState, useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import '../styles/ChatBot.css';
import useStore from "../context/UseStore.jsx";
import { placeOptions } from "../data/OptionsData.jsx";

const ChatBot = () => {
    const [showPlane, setShowPlane] = useState(false);
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false); // 로딩 상태 추가
    const { state } = useStore();
    const inputRef = useRef(null);
    const placeData = placeOptions.find(option => option.label === state.inputValues.placeOption)?.value || 'nomatter';
    const backgroundImage = `/assets/${placeData}Background.jfif`;
    const { planType, selectedDates, personnelOption = '1', region, placeOption, transportOption, travelStyleOption = 'nomatter' } = state.inputValues;

    const isOneDayTrip = selectedDates[0] === selectedDates[1];
    
    const systemMessage = planType === "random"
        ? `너는 랜덤 여행 플래너야. 가급적 존댓말을 사용하고 사용자가 정해준 날짜와 지역을 바탕으로 일정만 추천해줘. ${isOneDayTrip ? '반드시 ✅당일치기 (날짜) 형식으로 시간대별 추천대신 오전, 오후, 저녁' : '반드시 ✅n일차 (날짜, 차수) 형식으로 오전, 오후, 저녁, 숙박'} 계획을 작성해. ✅를 기준으로 줄바꿈 해줘`
        : `너는 여행 플래너야. 가급적 존댓말을 사용해줘. ${isOneDayTrip ? '반드시 ✅당일치기 (날짜) 형식으로 오전, 오후, 저녁' : '반드시 ✅n일차 (날짜, 차수) 형식으로 오전, 오후, 저녁, 숙박'} 계획을 작성해. ✅를 기준으로 줄바꿈 해줘`;

    const initMessage = planType === "random"
        ? `${selectedDates[0]}${selectedDates[1] ? `부터 ${selectedDates[1]}까지` : ''}
            ${region}를 여행할 계획이야.
            일정 추천해줘.`
        : `${selectedDates[0]}${selectedDates[1] ? `부터 ${selectedDates[1]}까지` : ''}
            ${personnelOption}명이 ${region}를 여행을 가.
            선호하는 지형은 ${placeOption}이고, 이동수단은 ${transportOption}이야.
            여행 스타일은 ${travelStyleOption === "nomatter" ? "상관없음" : travelStyleOption}이야.
            일정 추천해줘.`;


    //실행 여부를 추적하는 변수
    let executed = false;
    useEffect(() => {
        if (!executed) {
            const formatDate = (dateStr) => dateStr?.split('T')[0];
    
            const userInfoMessage = {
                id: uuidv4(),
                type: "response",
                text: `📅 일정:${isOneDayTrip ? ` ${formatDate(selectedDates[0])} (당일 하루)` : `\n${formatDate(selectedDates[0])}부터 ${formatDate(selectedDates[1])}까지`}\n📍 목적지: ${region}`,
                timestamp: new Date().toLocaleDateString("ko-KR"),
            };
    
            setMessages([userInfoMessage]);
            sendMessage(initMessage, false, systemMessage);
            executed = true;
        }
    }, []);
    
    

    // 메시지 전송 함수
    const handleSendMessage = (e) => {
        e.preventDefault();
        if (!inputRef.current.value.trim()) return;
        sendMessage(inputRef.current.value, true);
        inputRef.current.value = "";
    };

    // OpenAI API에 메시지 전송
    const sendMessage = async (userMessage, showUserMessage, systemMessage) => {
        if (!userMessage) return;

        // ✈️ 비행기 애니메이션 시작
        setShowPlane(true);
        setLoading(true); // 로딩 시작

        setTimeout(() => setShowPlane(false), 3000);

        // 사용자의 입력 메시지를 채팅창에 추가 (초기 메시지는 추가 X)
        if (showUserMessage) {
            const newMessage = {
                id: uuidv4(),
                type: "prompt",
                text: userMessage,
                timestamp: new Date().toLocaleDateString("ko-KR"),
            };
            setMessages(prevMessages => [...prevMessages, newMessage]);
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
                        { role: "system", content: systemMessage },
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

            //새로운 응답 메시지를 추가
            setMessages((prevMessages) => [...prevMessages, botMessage]);

        } catch (error) {
            console.error("Error:", error);
            setMessages(prevMessages => [
                ...prevMessages,
                {
                    id: uuidv4(),
                    type: "response",
                    text: "죄송합니다. 잠시 후 다시 시도해주세요.",
                    timestamp: new Date().toLocaleDateString("ko-KR"),
                },
            ]);
        } finally {
            setLoading(false); // 로딩 종료
        }
    };


    return (
        <div className="app-container" style={{ backgroundImage: `url(${backgroundImage})` }}>
            <div className="chatbot-container">
                <div className="chatbot-header">
                    <div className="logo"><img width="70px" alt="" src="/src/assets/logo_wheretogo.png" /></div>
                </div>

                <div className="chat-messages">
                    {showPlane && <div className="flying-plane"><i className='bx bxs-plane-alt'></i></div>}
                    {messages.map((message) => (
                        <div
                            key={message.id}
                            className={`message ${message.type === 'prompt' ? 'user-message' : 'bot-message'}`}
                        >
                            {message.text.split('\n').map((line, index) => (
                                <React.Fragment key={index}>{line}<br /></React.Fragment>
                            ))}
                        </div>
                    ))}
                    {loading && <div className="loading-indicator"><i className='bx bxs-plane-alt'></i></div>} {/* 로딩 인디케이터 추가 */}
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