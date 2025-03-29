import React, { useState } from 'react';
import {useNavigate} from "react-router-dom";
import '../styles/Login.css'
import {useModal} from "../components/ModalProvider.jsx";
import useStore from "../context/UseStore.jsx";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [token, setToken] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const {dispatch} = useStore();

    const { showModal } = useModal();

    const handleAlert = () => {
        showModal('로그인이 완료되었습니다.','/');
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const res = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/api/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            const data = await res.json();

            if (!res.ok) {
                showModal(data.message || '로그인 실패');
                return;
            }

            // ✅ 토큰 저장 (localStorage or 상태)
            dispatch({ type: "LOGIN", payload: data.token });
            handleAlert();

        } catch (err) {
            console.error(err);
            setError('서버 오류');
        }
    };

    return (
        <div className="login-container">
            <h2>로그인</h2>
            <form onSubmit={handleLogin}>
                <input type="email" placeholder="이메일" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <input type="password" placeholder="비밀번호" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <button type="submit">로그인</button>
                <button type="button" onClick={()=>navigate('/join')}>회원가입</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {token && <p>토큰 저장됨 ✅</p>}
        </div>
    );
};

export default Login;
