import { db } from '../config/db.js';

// 후기 작성
export const createPost = async (req, res) => {
    try {
        const userId = req.user?.id;  // 토큰에서 파싱된 유저 정보
        if (!userId) return res.status(401).json({ message: '로그인이 필요합니다.' });

        const { title, content } = req.body;
        if (!title || !content) return res.status(400).json({ message: '제목과 내용을 입력해주세요.' });

        const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;
        console.log(imageUrl);

        await db.query(
            'INSERT INTO travel_posts (user_id, title, content, image_url) VALUES (?, ?, ?, ?)',
            [userId, title, content, imageUrl]
        );

        res.status(201).json({ message: '여행 후기 저장 성공' });
    } catch (err) {
        console.error('여행 후기 저장 실패:', err);
        res.status(500).json({ message: '서버 오류로 여행 후기 저장 실패', error: err.message });
    }
};

// 후기 리스트 조회
export const getAllPosts = async (req, res) => {
    try {
        const [rows] = await db.query(
            'SELECT id, title, content, image_url, created_at FROM travel_posts ORDER BY created_at DESC'
        );
        res.json(rows);
    } catch (err) {
        console.error('후기 조회 실패:', err);
        res.status(500).json({ message: '후기 조회 실패' });
    }
};

// 후기 상세 조회
export const getPostById = async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await db.query(
            'SELECT id, title, content, image_url, created_at FROM travel_posts WHERE id = ?',
            [id]
        );
        if (rows.length === 0) return res.status(404).json({ message: '후기를 찾을 수 없습니다.' });
        res.json(rows[0]);
    } catch (err) {
        console.error('상세 조회 실패:', err);
        res.status(500).json({ message: '상세 조회 실패' });
    }
};