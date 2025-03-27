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
import { useNavigate } from 'react-router-dom';
import '../styles/ChatBot.css';
import useStore from "../context/UseStore.jsx";
import saveIcon from "../../public/assets/images/saveico.png";
import { placeOptions } from "../data/OptionsData.jsx";
import { useModal } from "../components/ModalProvider.jsx";

const ChatBot = () => {
    const [showPlane, setShowPlane] = useState(false);
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const { state } = useStore();
    const { showModal } = useModal();
    const inputRef = useRef(null);
    const placeData = placeOptions.find(option => option.label === state.inputValues.placeOption)?.value || 'nomatter';
    const backgroundImage = `/assets/${placeData}Background.jfif`;
    const { planType, selectedDates, personnelOption = '1', region, placeOption, transportOption, travelStyleOption = 'nomatter' } = state.inputValues;
    const isOneDayTrip = selectedDates[0] === selectedDates[1];
    const formatDate = (dateStr) => dateStr?.split('T')[0];

    const systemMessage = planType === "random"
      ? `너는 랜덤 여행 플래너야. 반드시 존댓말을 사용하고, 사용자가 입력한 날짜와 지역 정보를 바탕으로 여행 일정을 추천해줘. 
    ${isOneDayTrip 
      ? '형식은 반드시 아래와 같아야 해:\n✅ 당일치기 (YYYY-MM-DD)\n오전:\n오후:\n저녁:' 
      : '형식은 반드시 아래와 같아야 해:\n✅ n일차 (YYYY-MM-DD)\n오전:\n오후:\n저녁:\n숙박:'}
    ✅ 기호를 사용하여 일자별로 구분하고, 시간대는 "오전/오후/저녁/숙박" 순서로 구분해.`
      : `너는 여행 플래너야. 반드시 존댓말을 사용하고, 사용자가 입력한 날짜, 인원, 지역, 선호 옵션을 바탕으로 여행 일정을 추천해줘.
    ${isOneDayTrip 
      ? '형식은 반드시 아래와 같아야 해:\n✅ 당일치기 (YYYY-MM-DD)\n오전:\n오후:\n저녁:' 
      : '형식은 반드시 아래와 같아야 해:\n✅ n일차 (YYYY-MM-DD)\n오전:\n오후:\n저녁:\n숙박:'}
    ✅ 기호를 사용하여 일자별로 구분하고, 시간대는 "오전/오후/저녁/숙박" 순서로 구분해.`;


    const initMessage = planType === "random"
        ? `${selectedDates[0]}${selectedDates[1] ? `부터 ${selectedDates[1]}까지` : ''} ${region}를 여행할 계획이야. 일정 추천해줘.`
        : `${selectedDates[0]}${selectedDates[1] ? `부터 ${selectedDates[1]}까지` : ''} ${personnelOption}명이 ${region}를 여행을 가. 선호하는 지형은 ${placeOption}이고, 이동수단은 ${transportOption}이야. 여행 스타일은 ${travelStyleOption === "nomatter" ? "상관없음" : travelStyleOption}이야. 일정 추천해줘.`;

    const title = `📅 ${isOneDayTrip 
        ? `${formatDate(selectedDates[0])},` 
        : `${formatDate(selectedDates[0])} ~ ${formatDate(selectedDates[1])}  `
        }  \n📍 ${region}`;

    useEffect(() => {
        const userInfoMessage = {
            id: uuidv4(),
            type: "response",
            text: `📅 여행일정: ${formatDate(selectedDates[0])}${selectedDates[1] ? `부터 ${formatDate(selectedDates[1])}까지` : ' (당일 하루)'}\n📍 여행지역: ${region}`,
            timestamp: new Date().toLocaleDateString("ko-KR"),
        };
        setMessages([userInfoMessage]);
        sendMessage(initMessage, false, systemMessage);
    }, []);

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (!inputRef.current.value.trim()) return;
        sendMessage(inputRef.current.value, true,systemMessage);
        inputRef.current.value = "";
    };

    const handleSaveButtonClick = async (planMessage) => {
        try {
            const text = planMessage.text;
            const lines = text.split('\n');

            const days = [];
            let currentDay = null;
            let summary = "";

            lines.forEach((line) => {
                const trimmed = line.trim();

                // ✅1일차 (2025-04-06)
                const multiDayMatch = trimmed.match(/^✅ (\d+일차) \(([\d-]+)\)/);

                // 당일치기 (2025년 4월 5일)
                const oneDayMatch = trimmed.match(/^✅ 당일치기\s*\((.+?)\)/);

                if (multiDayMatch) {
                    if (currentDay) days.push(currentDay);
                    currentDay = {
                        type: "multi",
                        day: multiDayMatch[1],
                        date: multiDayMatch[2],
                    };
                } else if (oneDayMatch) {
                    if (currentDay) days.push(currentDay);
                    currentDay = {
                        type: "oneDay",
                        label: "당일치기",
                        date: oneDayMatch[1],
                    };
                } else if (currentDay && trimmed.includes(':')) {
                    // 예: 오전: 경주 도착
                    const [time, content] = trimmed.split(':');
                    if (time && content) {
                        const key = time.trim();
                        const value = content.trim();
                        // 시간대별 항목이 배열이면 여러 개 모을 수 있도록
                        if (!currentDay[key]) {
                            currentDay[key] = [value];
                        } else {
                            currentDay[key].push(value);
                        }
                    }
                } else if (trimmed && !trimmed.startsWith('✅')) {
                    // 요약 문구 저장
                    summary += trimmed + " ";
                }
            });

            if (currentDay) days.push(currentDay);

            const payload = {
                title,
                date: `${formatDate(selectedDates[0])}${selectedDates[1] ? `~${formatDate(selectedDates[1])}` : ''}`,
                messages:JSON.stringify(days),
                summary: summary.trim(),
                rawText: text,
            };

            const res = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/api/chat/save`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify(payload),
            });

            const data = await res.json();
            if (res.ok) {
                console.log('여행 플랜이 저장되었습니다.');
            } else {
                console.log(`여행 플랜 저장 오류: ${data.message}`);
            }
        } catch (err) {
            console.error('채팅 저장 실패:', err);
            console.log('서버 오류: 잠시후 다시 시도해 주세요.');
        }
    };

    const sendMessage = async (userMessage, showUserMessage, systemMessage) => {
        if (!userMessage) return;
        setShowPlane(true);
        setLoading(true);
        setTimeout(() => setShowPlane(false), 3000);

        if (showUserMessage) {
            const newMessage = {
                id: uuidv4(),
                type: "prompt",
                text: userMessage,
                timestamp: new Date().toLocaleDateString("ko-KR"),
            };
            setMessages(prev => [...prev, newMessage]);
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

            setMessages(prev => [...prev, botMessage]);
            if(!showUserMessage){
                handleSaveButtonClick(botMessage);
            }

        } catch (error) {
            console.error("Error:", error);
            setMessages(prev => [...prev, {
                id: uuidv4(),
                type: "response",
                text: "죄송합니다. 잠시 후 다시 시도해주세요.",
                timestamp: new Date().toLocaleDateString("ko-KR"),
            }]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="app-container" style={{ backgroundImage: `url(${backgroundImage})` }}>
            <div className="chatbot-container">
                <div className="chatbot-header">
                    <div className="logo"><img width="70px" alt="logo" src="/assets/images/logo_wheretogo.png" /></div>
                </div>

                <div className="chat-messages">
                    {showPlane && <div className="flying-plane"><i className='bx bxs-plane-alt'></i></div>}
                    {messages.map((message) => (
                        <div key={message.id} className={`message ${message.type === 'prompt' ? 'user-message' : 'bot-message'}`}>
                            {message.text.split('\n').map((line, i) => (
                                <React.Fragment key={i}>{line}<br /></React.Fragment>
                            ))}
                        </div>
                    ))}
                    {loading && <div className="loading-indicator"><i className='bx bxs-plane-alt'></i></div>}
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