import { db } from '../config/db.js';

export const getMyPage = async (req, res) => {
    const userId = req.user.id; // authMiddleware에서 추출한 user
    try {
        const [userRows] = await db.query('SELECT name, email, phoneNumber FROM users WHERE id = ?', [userId]);
        const [plans] = await db.query('SELECT id, title, date FROM travel_plans WHERE user_id = ?', [userId]);

        res.json({ userInfo: userRows[0], plans });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: '마이페이지 조회 실패' });
    }
};

export const updateUser = async (req, res) => {
    const userId = req.user.id;
    const { name, email, phone } = req.body;
    try {
        await db.query('UPDATE users SET name = ?, email = ?, phoneNumber = ? WHERE id = ?', [name, email, phone, userId]);
        res.json({ message: '정보 수정 성공' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: '정보 수정 실패' });
    }
};
