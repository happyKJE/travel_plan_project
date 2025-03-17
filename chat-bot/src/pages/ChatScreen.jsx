// /**
//  * @file ChatScreen.jsx
//  * @description chat bot 컨포넌트
//  * @author jungeun
//  * @created 2025-03-12
//  * @lastModifiedBy jungeun
//  * @lastModifiedDate 2025-03-12
//  */
//
// import React, {useState, useEffect, useRef} from 'react';
// import "../styles/ChatBotApp.css";
// import { v4 as uuidv4 } from 'uuid';
// import useStore from '../context/UseStore.jsx';
// import { useNavigate } from 'react-router-dom';
//
// const ChatScreen = () => {
//     const navigate = useNavigate();
//     const { state, dispatch } = useStore();
//     const [messages, setMessages] = useState('');
//     const activeChat = state.chats.find(chat => chat.id === state.activeChatId);
//     const inputRef = useRef(null);
//
//     // useEffect(() => {
//     //     if (state.chats.length === 0) {
//     //         dispatch({ type: 'CREATE_CHAT' });
//     //     }
//         // const activeChatObj = state.chats.find((chat) => chat.id === state.activeChatId);
//         // setMessages(activeChatObj ? activeChatObj.messages : []);
//     // }, [dispatch,state.chats.length, state.activeChatId, state.chats]);
//
//     useEffect(() => {
//         if (state.chats.length === 0) {
//             dispatch({ type: 'CREATE_CHAT' });
//         }
//         const initMessages = `${state.inputValues.인원}인원이 여행을 가려고 하는데, 선호하는 장소는 ${state.inputValues.placeOption}. 여행 스타일은 ${state.inputValues.여행스타일 === "nomatter" ? "상관없음" : state.inputValues.여행스타일}이며, 이동 수단은 ${state.inputValues.transportOption}이야. 여행계획 짜줄래?.`
//         sendMessage(initMessages).then(console.log(initMessages));
//         }, []);
//
//     const sendMessage = async (inputValue) => {
//         if (!inputValue.trim()) return;
//
//         const newMessage = {
//             type: "prompt",
//             text: inputValue,
//             timeStamp: new Date().toLocaleDateString()
//         }
//
//         let chatId = state.activeChatId;
//
//         if (!chatId) {
//             dispatch({ type: "CREATE_CHAT" });
//             chatId = state.chats[0]?.id;
//         }
//
//         dispatch({
//             type: "ADD_MESSAGE",
//             payload: { chatId: chatId, message: newMessage },
//         });
//
//         console.log(chatId);
//         console.log(state.messages);
//         console.log(newMessage);
//         try {
//             console.log('sending message');
//             const response = await fetch('https://api.openai.com/v1/chat/completions',
//                 {
//                     method: 'POST',
//                     headers: {
//                         'Accept': 'application/json',
//                         'Content-Type': 'application/json',
//                         Authorization: `Bearer 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`
//                     },
//                     body: JSON.stringify({
//                         model: 'gpt-3.5-turbo',
//                         messages: [{role: 'user', content: inputValue}],
//                         max_tokens: 500,
//                     }),
//                 });
//
//             const data = await response.json();
//             const chatResponse = data.choices[0]?.message.content.trim() || "No response";
//
//             dispatch({
//                 type: "ADD_MESSAGE",
//                 payload: {
//                     chatId,
//                     message: { type: "response", text: chatResponse, timeStamp: new Date().toLocaleString("ko-KR") },
//                 },
//             });
//
//         } catch (error) {
//             console.error("API 호출 실패:", error);
//         }
//     };
//
//     const handleSelectChat = (id) => dispatch({ type: "SET_ACTIVE_CHAT", payload: id });
//
//     const handleDeleteChat = (id) => dispatch({ type: "DELETE_CHAT", payload: id });
//
//     return (
//         <div className='chat-app'>
//             <div className='chat-list'>
//                 <div className='chat-list-header'>
//                     <h4>Plan List</h4>
//                     <i className='bx bx-edit-alt new-chat' onClick={() => dispatch({ type: 'CREATE_CHAT' })}></i>
//                 </div>
//                 {state.chats.map((chat) => (
//                     <div
//                         key={chat.id}
//                         className={`chat-list-item ${chat.id === state.activeChatId ? 'active' : ''}`}
//                         onClick={() => handleSelectChat(chat.id)}
//                     >
//                         <h4>{chat.displayId}</h4>
//                         <i className='bx bx-x-circle' onClick={(e) => {
//                             e.stopPropagation();
//                             handleDeleteChat(chat.id);
//                         }}></i>
//                     </div>
//                 ))}
//             </div>
//             <div className='chat-window'>
//                 <div className='chat-title'>
//                     <h3>Chat with AI</h3>
//                     <i onClick={() => navigate('/plan-selection')} className='bx bx-arrow-back arrow'></i>
//                 </div>
//                 <div className='chat'>
//                     {activeChat?.messages.map((msg, index) => (
//                         <div
//                             key={index}
//                             className={msg.type === "prompt" ? 'prompt' : 'response'}>
//                             {msg.text}
//                             <span>{msg.timeStamp}</span>
//                         </div>
//                     ))}
//                 </div>
//                 <form className='msg-form' onSubmit={(e) => e.preventDefault()}>
//                     <i className='fa-solid fa-face-smile emoji'></i>
//                     <input
//                         type="text"
//                         className='msg-input'
//                         placeholder='Type a message...'
//                         ref={inputRef}
//                         onKeyDown={(e) => e.key === "Enter" && sendMessage(inputRef)}
//                     />
//                     <i className="fa-solid fa-paper-plane" onClick={()=>sendMessage(inputRef)}></i>
//                 </form>
//             </div>
//         </div>
//     )
// }
//
// export default ChatScreen;


import React, {useState, useEffect, useRef} from 'react';
import { v4 as uuidv4 } from 'uuid';
import '../styles/ChatBot.css';
import useStore from "../context/UseStore.jsx";

const ChatBot = () => {
    const [showPlane, setShowPlane] = useState(false);
    const [activeChat, setActiveChat] = useState(false);
    const [messages, setMessages] = useState([]);
    const [chats, setChats] = useState([]);
    const {state, dispatch} = useStore();
    const inputRef = useRef(null);

    const newChat = {
        id: uuidv4(),
        title: '새로운 정보대화',
        messages: []
    };

    useEffect(() => {
       handleNewChat();
    }, []);

    useEffect(() => {
        const activeChatObject = chats.find((chat) => chat.id === activeChat?.id);
        if (activeChatObject) {
            setMessages(activeChatObject.messages);
        }
    }, [activeChat, chats]);



    const handleSendMessage = (e) => {
        e.preventDefault();
        sendMessage();
    };

    const sendMessage = async () => {
        if (inputMessage.trim() === '') return;

        // 비행기 애니메이션 시작
        setShowPlane(true);
        setTimeout(() => setShowPlane(false), 3000);

        const newMessage = {
            id: uuidv4(),
            type: 'prompt',
            text: inputMessage,
            timestamp: new Date().toLocaleDateString('ko-KR')
        };

        const updatedMessages = [...messages, newMessage];
        const updatedChats = chats.map((chat) => {
            if (chat.id === activeChat?.id) {
                return { ...chat, messages: updatedMessages };
            }
            return chat;
        });

        setChats(updatedChats);
        setMessages(updatedMessages);
        setInputMessage('');

        try {
            const response = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${process.env.REACT_APP_CLIENT_ID}`
                },
                body: JSON.stringify({
                    model: 'gpt-3.5-turbo',
                    messages: [{ role: 'user', content: inputMessage }],
                    max_tokens: 500,
                })
            });

            const chatResponse = await response.json();

            const botMessage = {
                id: uuidv4(),
                type: 'response',
                text: chatResponse.choices[0].message.content,
                timestamp: new Date().toLocaleDateString('ko-KR')
            };

            const newUpdatedMessages = [...updatedMessages, botMessage];
            const newUpdatedChats = chats.map((chat) => {
                if (chat.id === activeChat?.id) {
                    return { ...chat, messages: newUpdatedMessages };
                }
                return chat;
            });

            setChats(newUpdatedChats);
            setMessages(newUpdatedMessages);
            setCurrentStep(currentStep + 1);
        } catch (error) {
            console.error('Error:', error);
            const botMessage = {
                id: uuidv4(),
                type: 'response',
                text: "죄송합니다. 잠시 후 다시 시도해주세요.",
                timestamp: new Date().toLocaleDateString('ko-KR')
            };

            const newUpdatedMessages = [...updatedMessages, botMessage];
            const newUpdatedChats = chats.map((chat) => {
                if (chat.id === activeChat?.id) {
                    return { ...chat, messages: newUpdatedMessages };
                }
                return chat;
            });

            setChats(newUpdatedChats);
            setMessages(newUpdatedMessages);
        }
    };

    const handleNewChat = () => {
        const newChat = {
            id: uuidv4(),
            title: '새로운 정보대화',
            messages: []
        };
    };

    const handleDeleteChat = (chatId) => {
        const updatedChats = chats.filter(chat => chat.id !== chatId);
        setChats(updatedChats);

        if (activeChat?.id === chatId) {
            const nextChat = updatedChats[0];
            setActiveChat(nextChat || null);
            setMessages(nextChat?.messages || []);
        }
    };

    return (
        <div className="app-container">
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
                            {message.text}
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