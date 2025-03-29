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

