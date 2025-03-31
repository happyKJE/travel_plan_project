import express from 'express';
import { getMyPage } from '../controllers/UserControllers.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/mypage', authMiddleware, getMyPage);

export default router;
