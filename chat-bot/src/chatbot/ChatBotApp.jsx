    import React, {useEffect, useState} from 'react'
    import "../styles/ChatBotApp.css"


    const ChatBotApp = ({onGoBack, chats, setChats, activeChat, setActiveChat, onNewChat}) => {
        const [inputValue, setInputValue] = useState('');
        const [messages, setMessages] = useState(chats[0]?.messages || []);

        //deps값 중 하나라도 변화하면 실행
        useEffect(() => {
            const activeChatObj = chats.find((chat) => chat.id === activeChat);
            setMessages(activeChatObj ? activeChatObj.messages : []);
        },[activeChat, chats])

        const handleInputChange = (e) => {
            setInputValue(e.target.value);
        }

        const sendMessage = async () => {
            if(inputValue.trim() === '') return
            const newMessage = {
                type: "prompt",
                text: inputValue,
                timeStamp:new Date().toLocaleDateString(),
            }

            if(!activeChat){
                onNewChat(newMessage);
                setInputValue('');
            }else {
                // messages 배열에 newMessage를 추가하여 새로운 배열을 생성
                const updatedMessages = [...messages, newMessage];

                setMessages(updatedMessages);
                setInputValue('');

                const updatedChats = chats.map((chat) => {
                    if (chat.id === activeChat) {
                        return {...chat, messages: updatedMessages}
                    }
                    return chat
                })
                setChats(updatedChats);

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
                            messages: [{ role: 'user', content: inputValue }],
                            max_tokens: 500,
                        }),
                    }
                )
                const data = await response.json()
                const chatResponse = data.choices[0].message.content.trim()

                const newResponse = {
                    type: "response",
                    text: chatResponse,
                    timeStamp: new Date().toLocaleDateString(),
                }

                const updatedMessagesWithResponse = [...updatedMessages, newResponse];
                setMessages(updatedMessagesWithResponse);

                const updatedChatsWithResponse = chats.map((chat) => {
                    if(chat.id === activeChat) {
                        return {...chat, messages: updatedMessagesWithResponse}
                    }
                    return chat
                })
                setChats(updatedChatsWithResponse);
            }
        }

        const handleKeyDown = (e) => {
            if (e.key === "Enter") {
                e.preventDefault();
                sendMessage();
            }
        }

        const handleSelectChat = (id) => {
            setActiveChat(id);
        }

        const handleDeleteChat = (id) => {
            const updatedChats = chats.filter((chat) => chat.id !== id)
            setChats(updatedChats);
            console.log("id: "+id);
            console.log("activeChat: "+activeChat);
            if(id === activeChat) {
                const newActiveChat = updatedChats.length > 0 ? updatedChats[0].id : null;
                console.log(newActiveChat);
                setActiveChat(newActiveChat);
                console.log(activeChat)
            }
        }

        return (
          <div className='chat-app'>
            <div className='chat-list'>
                <div className='chat-list-header'>
                    <h2>Chat List</h2>
                    {/*
                       기본적으로는 onClick={onNewChat}
                       클로저 문제, 이벤트 캐싱 문제, 상태 업데이트 관련 이슈가 있을 경우 onClick={() => onNewChat()} 형식이 더 안정적
                       성능 최적화를 위해 useCallback을 사용하여 불필요한 함수 재생성을 방지하는게 좋음.
                        ex) const onNewChat = useCallback(() => {}, []);
                    */}
                    <i className='bx bx-edit-alt new-chat' onClick = {()=>onNewChat()}></i>
                </div>
                {chats.map((chat) => (
                    <div
                        key = {chat.id}
                        className = {`chat-list-item ${chat.id === activeChat ? 'active' : ''}`}
                        onClick = {() => handleSelectChat(chat.id)}
                    >
                        <h4>{chat.displayId}</h4>
                        <i className='bx bx-x-circle' onClick={(e)=> {
                            e.stopPropagation();
                            handleDeleteChat(chat.id)
                        }}></i>
                    </div>
                ))}
            </div>
            <div className='chat-window'>
                <div className='chat-title'>
                    <h3>Chat with AI</h3>
                        <i onClick={onGoBack} className='bx bx-arrow-back arrow'></i>
                </div>
                <div className='chat'>
                    {messages.map((msg, index) => (
                        <div
                            key={index}
                            className= {msg.type === "prompt"?'prompt':'response'}>
                                {msg.text}
                            <span>{msg.timeStamp}</span>
                        </div>
                    ))}
                    {/*<div className='typing'>*/}
                    {/*    Typing...*/}
                    {/*</div>*/}
                </div>
                <form className='msg-form' onSubmit={(e) => {e.preventDefault();}}>
                    <i className='fa-solid fa-face-smile emoji'></i>
                    <input
                        type="text"
                        className='msg-input'
                        placeholder='Type a message...'
                        value={inputValue}
                        onChange = {handleInputChange}
                        onKeyDown={handleKeyDown}
                    />
                    <i className="fa-solid fa-paper-plane" onClick={sendMessage}></i>
                </form>
            </div>
          </div>
        )
      }

    export default ChatBotApp;
