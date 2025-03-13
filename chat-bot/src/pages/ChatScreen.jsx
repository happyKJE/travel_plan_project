/**
 * @file ChatScreen.jsx
 * @description chat bot 컨포넌트
 * @author jungeun
 * @created 2025-03-12
 * @lastModifiedBy jungeun
 * @lastModifiedDate 2025-03-12
 */

import React, {useState, useCallback, useEffect} from 'react';
import "../styles/ChatBotApp.css";
import useStore from '../context/UseStore.jsx';
import { useNavigate } from 'react-router-dom';

const ChatScreen = () => {
    const navigate = useNavigate();
    const { state, dispatch } = useStore();
    const [messages, setMessages] = useState('');
    const [inputValue, setInputValue] = useState('');
    const activeChat = state.chats.find(chat => chat.id === state.activeChatId);

    useEffect(() => {
        if (state.chats.length === 0) {
            dispatch({ type: 'CREATE_CHAT' });
        }
        const activeChatObj = state.chats.find((chat) => chat.id === state.activeChatId);
        setMessages(activeChatObj ? activeChatObj.messages : []);
    }, [dispatch,state.chats.length, state.activeChatId, state.chats]);
    
    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    }

    const sendMessage = useCallback(async () => {
        if (!inputValue.trim()) return;

        const newMessage = {
            type: "prompt",
            text: inputValue,
            timeStamp: new Date().toLocaleDateString()
        }

        let chatId = state.activeChatId;

        if (!chatId) {
            dispatch({ type: "CREATE_CHAT" });
            chatId = state.chats[0]?.id;
        }

        dispatch({
            type: "ADD_MESSAGE",
            payload: { chatId: chatId, message: newMessage },
        });

        console.log(chatId);
        console.log(state.messages);
        console.log(newMessage);
        try {
            const response = await fetch('https://api.openai.com/v1/chat/completions',
                {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        Authorization: `Bearer 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`
                    },
                    body: JSON.stringify({
                        model: 'gpt-3.5-turbo',
                        messages: [{role: 'user', content: inputValue}],
                        max_tokens: 500,
                    }),
                });
            
            const data = await response.json();
            const chatResponse = data.choices[0]?.message.content.trim() || "No response";

            dispatch({
                type: "ADD_MESSAGE",
                payload: {
                    chatId,
                    message: { type: "response", text: chatResponse, timeStamp: new Date().toLocaleString("ko-KR") },
                },
            });

            setInputValue("");
        } catch (error) {
            console.error("API 호출 실패:", error);
        }
    }, [inputValue, state.activeChatId, dispatch]);

    const handleSelectChat = (id) => dispatch({ type: "SET_ACTIVE_CHAT", payload: id });

    const handleDeleteChat = (id) => dispatch({ type: "DELETE_CHAT", payload: id });

    return (
        <div className='chat-app'>
            <div className='chat-list'>
                <div className='chat-list-header'>
                    <h4>Plan List</h4>
                    <i className='bx bx-edit-alt new-chat' onClick={() => dispatch({ type: 'CREATE_CHAT' })}></i>
                </div>
                {state.chats.map((chat) => (
                    <div
                        key={chat.id}
                        className={`chat-list-item ${chat.id === state.activeChatId ? 'active' : ''}`}
                        onClick={() => handleSelectChat(chat.id)}
                    >
                        <h4>{chat.displayId}</h4>
                        <i className='bx bx-x-circle' onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteChat(chat.id);
                        }}></i>
                    </div>
                ))}
            </div>
            <div className='chat-window'>
                <div className='chat-title'>
                    <h3>Chat with AI</h3>
                    <i onClick={() => navigate('/plan-selection')} className='bx bx-arrow-back arrow'></i>
                </div>
                <div className='chat'>
                    {activeChat?.messages.map((msg, index) => (
                        <div
                            key={index}
                            className={msg.type === "prompt" ? 'prompt' : 'response'}>
                            {msg.text}
                            <span>{msg.timeStamp}</span>
                        </div>
                    ))}
                </div>
                <form className='msg-form' onSubmit={(e) => e.preventDefault()}>
                    <i className='fa-solid fa-face-smile emoji'></i>
                    <input
                        type="text"
                        className='msg-input'
                        placeholder='Type a message...'
                        value={inputValue}
                        onChange={handleInputChange}
                        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                    />
                    <i className="fa-solid fa-paper-plane" onClick={sendMessage}></i>
                </form>
            </div>
        </div>
    )
}

export default ChatScreen;
