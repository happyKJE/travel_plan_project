import express from 'express';
import {deleteChat, getPlan, saveChat} from '../controllers/ChatControllers.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/save', authMiddleware, saveChat);
router.delete('/delete/:id', authMiddleware, deleteChat);
router.get('/plan/:id', authMiddleware, getPlan);

export default router;