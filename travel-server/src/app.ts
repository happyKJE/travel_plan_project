// src/app.ts
import express from 'express';
import cors from 'cors';

import userRoutes from './routes/UserRoutes.js';
import authRoutes from './routes/AuthRoutes';
import chatRoutes from './routes/ChatRoutes';

const app = express();

// ✅ 미들웨어 설정
app.use(cors());
app.use(express.json());

// ✅ API 라우터 연결
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/chat', chatRoutes);

// ✅ 헬스 체크 (배포 확인용)
app.get('/', (_req, res) => {
  res.send('✅ Travel Server is running');
});

export default app;
