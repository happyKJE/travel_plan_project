import express from 'express';
import cors from 'cors';
import fs from 'fs';

// ✅ 라우트 파일 import
import userRoutes from './routes/UserRoutes.js';
import authRoutes from './routes/AuthRoutes.js';
import chatRoutes from './routes/ChatRoutes.js';
import postsRoutes from './routes/PostsRoutes.js';

const app = express();

// ✅ uploads 폴더 생성 (없으면 자동 생성)
const uploadPath = 'uploads/';
if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath);
    console.log('✅ uploads 폴더 생성 완료');
}

// ✅ 공통 미들웨어 등록
app.use(cors());
app.use(express.json({ limit: '10mb' })); // JSON 요청 본문 처리
app.use(express.urlencoded({ extended: true, limit: '10mb' })); // Form-Data 처리
app.use('/uploads', express.static('uploads')); // 업로드 파일 접근 경로

// ✅ API 라우트 등록
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/posts', postsRoutes); // 게시판 라우트

export default app;
