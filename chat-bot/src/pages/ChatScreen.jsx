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
import { useModal } from "../components/ModalProvider.jsx";

const ChatBot = () => {
    const [showPlane, setShowPlane] = useState(false);
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const { state } = useStore();
    const inputRef = useRef(null);
    const placeData = placeOptions.find(option => option.label === state.inputValues.placeOption)?.value || 'nomatter';
    const backgroundImage = `/assets/${placeData}Background.jfif`;
    const { planType, selectedDates, personnelOption = '1', region, placeOption, transportOption, travelStyleOption = 'nomatter' } = state.inputValues;
    const isOneDayTrip = selectedDates[0] === selectedDates[1];
    const formatDate = (dateStr) => dateStr?.split('T')[0];

    const systemMessage = planType === "random"
      ? `너는 여행지역을 무작위으로 선택한 도전적인 사용자에게 가볼만한 관광지를 추천해주는 여행 플래너야. 사용자가 입력한 날짜와 지역 정보를 바탕으로 여행 일정을 추천해줘. 
    ${isOneDayTrip 
      ? '형식은 반드시 아래와 같아야 해:\n✅ 당일치기 (YYYY-MM-DD)\n추천 관광지:' 
      : '여행일자 수만큼 일자별로 안내해주고 형식은 반드시 아래와 같아야 해:\n✅ n일차 (YYYY-MM-DD)\n추천 관광지: n.장소 (최소 두곳)'}
    반드시 ✅ 기호를 사용하여 일자별로 구분해, 반드시 실존하는 관광지를 추천해주고 간략하게 해당 장소에대해서 소개시켜줘`
      : `너는 안정적인 여행을 원하는 사용자에게 가볼만한 관광지를 추천해주는 여행 플래너야. 사용자가 입력한 날짜, 인원, 지역, 선호 옵션을 바탕으로 여행 일정을 추천해줘.
    ${isOneDayTrip 
      ? '형식은 반드시 아래와 같아야 해:\n✅ 당일치기 (YYYY-MM-DD)\n추천 관광지: n.장소' 
      : '여행일자 수만큼 일자별로 안내해주고 형식은 반드시 아래와 같아야 해:\n✅ n일차 (YYYY-MM-DD)\n추천 관광지: n.장소(최소 두곳)'}
    반드시 ✅ 기호를 사용하여 일자별로 구분해, 반드시 실존하는 관광지를 추천해주고 간략하게 해당 장소에대해서 소개시켜줘`;


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
            let section = null; // 현재 위치: "locations" 또는 "night"

            const isNumberedLine = (line) => /^\d+\.\s*/.test(line);

            lines.forEach((line) => {
                const trimmed = line.trim();

                // ✅ 1일차 (YYYY-MM-DD)
                const multiDayMatch = trimmed.match(/^✅\s*(\d+일차)\s*\((\d{4}-\d{2}-\d{2})\)/);
                // ✅ 당일치기 (YYYY-MM-DD)
                const oneDayMatch = trimmed.match(/^✅\s*당일치기\s*\((\d{4}-\d{2}-\d{2})\)/);

                if (multiDayMatch) {
                    if (currentDay) days.push(currentDay);
                    currentDay = {
                        type: "multi",
                        day: multiDayMatch[1],
                        date: multiDayMatch[2],
                        locations: [],
                        night: [],
                    };
                    section = null;
                    return;
                }

                if (oneDayMatch) {
                    if (currentDay) days.push(currentDay);
                    currentDay = {
                        type: "oneDay",
                        label: "당일치기",
                        date: oneDayMatch[1],
                        locations: [],
                        night: [],
                    };
                    section = null;
                    return;
                }

                if (trimmed.startsWith("추천 관광지")) {
                    section = "locations";
                    return;
                }
                
                if (currentDay && section && isNumberedLine(trimmed)) {
                    const cleaned = trimmed.replace(/^\d+\.\s*/, ''); // "1. 장소" → "장소"
                    currentDay[section].push(cleaned);
                    return;
                }

                // 기타 요약용 문장
                if (trimmed && !trimmed.startsWith("✅")) {
                    currentDay.night = (currentDay.night || "") + trimmed + " ";
                }
            });

            if (currentDay) days.push(currentDay);

            const payload = {
                title,
                date: `${formatDate(selectedDates[0])}${selectedDates[1] ? `~${formatDate(selectedDates[1])}` : ''}`,
                messages: JSON.stringify(days),
                night: days.map(d => d.night).join(" ").trim(),
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
                console.log('✅ 여행 플랜이 저장되었습니다.');
            } else {
                console.log(`🚨 여행 플랜 저장 오류: ${data.message}`);
            }
        } catch (err) {
            console.error('❌ 채팅 저장 실패:', err);
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