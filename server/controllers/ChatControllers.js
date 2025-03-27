import { db } from '../config/db.js';

export const saveChat = async (req, res) => {

    const userId = req.user.id; // authMiddleware에서 넘어온 유저 ID
    const { title, date, messages } = req.body;

    try {
        const jsonContent = JSON.stringify(messages);

        await db.query(
            'INSERT INTO travel_plans (user_id, title, date, description) VALUES (?, ?, ?, ?)',
            [userId, title, date, jsonContent]
        );

        res.json({ message: '채팅 저장 성공' });
    } catch (err) {
        console.error('채팅 저장 실패:', err);
        res.status(500).json({ message: '채팅 저장 실패', error: err.message });
    }
};

export const deleteChat = async (req, res) => {
    const userId = req.user.id;
    const { id } = req.params;

    try {
        await db.query('DELETE FROM travel_plans WHERE id = ? AND user_id = ?', [id, userId]);
        res.json({ message: '삭제 성공' });
    } catch (err) {
        console.error('삭제 실패:', err);
        res.status(500).json({ message: '삭제 실패', error: err.message });
    }
};
