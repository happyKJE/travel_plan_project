import dotenv from 'dotenv';
dotenv.config();

import express, { Application } from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';

//  라우트 파일 import (확장자 제거)
import userRoutes from './routes/UserRoutes';
import authRoutes from './routes/AuthRoutes';
import chatRoutes from './routes/ChatRoutes';
import postRoutes from "./routes/PostRoutes";

const app: Application = express();

//  uploads 폴더 생성 (없으면 자동 생성)
const uploadPath = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath);
  console.log('✅ uploads 폴더 생성 완료');
}

//  공통 미들웨어 등록
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use('/uploads', express.static(uploadPath)); // 상대 경로 → 절대 경로

// ✅ API 라우트 등록
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/posts', postRoutes);

export default app;
