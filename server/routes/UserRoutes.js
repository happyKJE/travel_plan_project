import express from 'express';
import { getMyPage, updateUser } from '../controllers/UserControllers.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/mypage', authMiddleware, getMyPage);
router.put('/update', authMiddleware, updateUser);

export default router;
