import { db } from '../config/db.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

// 로그인
export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        if (rows.length === 0) return res.status(401).json({ message: '이메일이 존재하지 않습니다.' });

        const user = rows[0];
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ message: '비밀번호가 틀렸습니다.' });

        const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });

        res.json({ token, user: { id: user.id, email: user.email, name: user.name } });
    } catch (err) {
        console.error(err);
        res.status(500).send('서버 에러');
    }
};

// 회원가입 (비밀번호 암호화)
export const register = async (req, res) => {
    const { id, email, password, phoneNumber, name } = req.body;
    try {
        const hashed = await bcrypt.hash(password, 10);
        await db.query('INSERT INTO users (id, email, password, phoneNumber, name) VALUES (?, ?, ?, ?, ?)', [id, email, hashed, phoneNumber, name]);
        res.json({ message: '회원가입 성공' });
    } catch (err) {
        console.error(err);
        if (err.code === 'ER_DUP_ENTRY') {
            res.status(400).json({ message: '이미 존재하는 이메일입니다.' });
        } else {
            res.status(500).json({ message: '회원가입 실패', error: err.message });
        }
    }
};
