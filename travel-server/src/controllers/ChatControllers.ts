import prisma from '../config/PrismaClient.js';
import { Request, Response } from 'express';
import { JwtPayload } from 'jsonwebtoken';

interface AuthenticatedRequest extends Request {
  user?: {
    id: number;
    email?: string;
  } | JwtPayload;
}

export const saveChat = async (req:AuthenticatedRequest, res:Response) => {
  
  const userId = (req.user as { id: number })?.id; // authMiddleware에서 넘어온 유저 ID
  const { title, date, messages } = req.body;

  try {
    const jsonContent = JSON.stringify(messages);

    await prisma.travelPlan.create({
      data: {
        user_id: userId,
        title: title,
        date: date,
        description: jsonContent,
      },
    });

    res.json({ message: '✅ 채팅 저장 성공' });
  } catch (err:any) {
    console.error('❌ 채팅 저장 실패:', err);
    res.status(500).json({ message: '채팅 저장 실패', error: err.message });
  }
};