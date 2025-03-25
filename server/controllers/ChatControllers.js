import { db } from '../config/db.js';

export const saveChat = async (req, res) => {
    const userId = req.user.id; // authMiddleware로 파싱된 유저 정보{ id, email, password, phoneNumber, name }
    const { id,title,date, messages } = req.body;

    try {
        const jsonContent = JSON.stringify(messages);
        await db.query(
            'INSERT INTO travel_plans (id, user_id,title,date,description) VALUES (?, ?, ?, ?, ?)',
            [id,userId,title,date,jsonContent]
        );
        res.json({ message: '채팅 저장 성공' });
    } catch (err) {
        console.error('채팅 저장 실패:', err);
        res.status(500).json({ message: '채팅 저장 실패' });
    }
};
