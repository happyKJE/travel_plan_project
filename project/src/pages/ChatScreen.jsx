import React, { useEffect, useState } from 'react';

const ChatScreen = ({ inputValues }) => {
  const [chatData, setChatData] = useState(null);

  useEffect(() => {
    const fetchChatResponse = async () => {
      try {
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(inputValues)
        });
        const data = await response.json();
        setChatData(data);
      } catch (error) {
        console.error('API 호출 에러:', error);
      }
    };

    fetchChatResponse();
  }, [inputValues]);

  return (
    <div className="next-screen">
      <h2>챗봇 채팅창</h2>
      {chatData ? (
        <div>{chatData.message}</div>
      ) : (
        <div>로딩중...</div>
      )}
    </div>
  );
};

export default ChatScreen;
