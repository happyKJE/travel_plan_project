import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import useStore from '../context/UseStore';
import '../styles/SavingChat.css';  // 스타일 추가

const SavingChat = () => {
  const location = useLocation();  // 이전 페이지에서 전달된 상태를 가져옴

  const [id, setId] = useState('');
  const [nickname, setNickname] = useState('');
  const messages = location.state?.messages || [];  // 전달된 messages 데이터 가져오기
  const { state, dispatch } = useStore();

  const handleSubmit = () => {
    if(nickname == ''){
      alert("닉네임을 입력해주세요.");
      return;
    }

    console.log('ID: '+ 0);
    console.log('Nickname: '+ nickname);
    console.log(messages);
    console.log("location.state : " , location.state);

    // ID와 닉네임, 메시지를 처리하는 로직을 추가할 수 있음
  };

  return (
    <div className="overlay">
      <div className="modal">
        <div>
          <h2>ID와 닉네임을 입력해 주세요</h2>
        </div>
        <div className='input-info'>
          <label>
            <p>ID: </p>
            <input
              type="text"
              value={id}
              onChange={(e) => setId(e.target.value)}
              placeholder="ID를 입력하세요" 
              disabled    //일단 비활성화, 여기 id값은 0으로 임시 지정함
            />
          </label>
          <label>
            <p>닉네임: </p>
            <input
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder="닉네임을 입력하세요"
            />
          </label>
        </div>
        <div className="modal-actions">
          <button onClick={handleSubmit}>저장</button>
        </div>
      </div>
    </div>
  );
};

export default SavingChat;