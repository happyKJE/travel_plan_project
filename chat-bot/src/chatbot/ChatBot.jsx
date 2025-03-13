import React, { useState, useEffect} from 'react';
import './ChatBot.css';
import { v4 as uuidv4 } from 'uuid';

const ChatBot = ({onGoBack, chats, setChats, activeChat, setActiveChat, onNewChat}) => {
  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [showPlane, setShowPlane] = useState(false);
  
  useEffect(() => {
    const activeChatObject = chats.find((chat) => chat.id === activeChat?.id);
    if (activeChatObject) { 
      setMessages(activeChatObject.messages);
    }
  }, [activeChat, chats]);

  useEffect(() => {
    if (chats.length === 0) {
      handleNewChat();
    }
  }, []);

  const handleInputChange = (e) => {
    setInputMessage(e.target.value);
  };

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
          'Authorization': 'Bearer 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'
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

    const initialBotMessage = {
      id: uuidv4(),
      type: 'response',
      text: "어디로 가고 싶으세요?",
      timestamp: new Date().toLocaleDateString('ko-KR')
    };

    newChat.messages = [initialBotMessage];
    
    setChats([newChat, ...chats]);
    setActiveChat(newChat);
    setMessages(newChat.messages);
    setCurrentStep(0);
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
      <div className="chat-list">
        <div className="chatbot-image">
          <img src="https://cdn-icons-png.flaticon.com/512/2040/2040946.png" alt="Cute Robot" />
        </div>
        <button className="new-chat-button" onClick={handleNewChat}>
          <i className="bx bx-plus"></i>
          새로운 채팅
        </button>
        <div className="chat-list-items">
          {chats.map((chat) => (
            <div
              key={chat.id}
              className={`chat-list-item ${activeChat?.id === chat.id ? 'active' : ''}`}
            >
              <div className="chat-item-content" onClick={() => setActiveChat(chat)}>
                <i className="bx bx-message-square"></i>
                {chat.title}
              </div>
              <button 
                className="delete-chat-button"
                onClick={() => handleDeleteChat(chat.id)}
              >
                <i className="bx bx-trash"></i>
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="chatbot-container">
        <div className="chatbot-header">
          <i className="bx bx-robot robot-icon"></i>
          <h3 className="chatbot-title">AI 챗봇</h3>
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
            value={inputMessage}
            onChange={handleInputChange}
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
