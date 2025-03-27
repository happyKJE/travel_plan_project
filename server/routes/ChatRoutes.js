import express from 'express';
import { saveChat, deleteChat } from '../controllers/ChatControllers.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/save', authMiddleware, saveChat);
router.delete('/delete/:id', authMiddleware, deleteChat);

export default router;
