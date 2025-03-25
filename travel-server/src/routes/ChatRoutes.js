import express from 'express';
import { saveChat } from '../controllers/ChatControllers.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/save', authMiddleware, saveChat);

export default router;
