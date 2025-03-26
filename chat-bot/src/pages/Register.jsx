import React, { useState } from 'react';
import '../styles/Register.css'
import {useModal} from "../components/ModalProvider.jsx";

const Register = () => {
    const { showModal } = useModal();

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        phoneNumber: '',
        name: '',
    });
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');

        try {
            const res = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/api/auth/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            })

            const data = await res.json();

            if (!res.ok) {
                setMessage(data.message || '회원가입 실패');
                return;
            }

            setFormData({ email: '', password: '',  name: '',phoneNumber:'' });
            showModal('회원가입이 완료되었습니다.','/login');

        } catch (err) {
            console.error(err);
            showModal('서버 오류: 잠시후 다시 시도해주세요.');
        }
    };

    return (
        <div className="register-container">
            <h2>회원가입</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    name="email"
                    placeholder="이메일"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="비밀번호"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="name"
                    placeholder="이름"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
                <input
                    type="tel"
                    name="phoneNumber"
                    placeholder="연락처"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    required
                />
                <button type="submit">회원가입</button>
            </form>

            {message && <p>{message}</p>}
        </div>
    );
};

export default Register;
