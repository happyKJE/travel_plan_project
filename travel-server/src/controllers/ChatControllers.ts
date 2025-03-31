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

export const deleteChat = async (req:AuthenticatedRequest, res:Response) => {
  const userId = (req.user as { id: number })?.id;
  const { id } = req.params;

  try {
    await prisma.travelPlan.delete({
      where: {
        id: Number(id),
        user_id: userId
      },
    })
    res.json({ message: '삭제 성공' });

  } catch (err:any) {
    console.error('삭제 실패:', err);
    res.status(500).json({ message: '삭제 실패', error: err.message });
  }
};

export const getPlan = async (req:AuthenticatedRequest, res:Response) => {

  const userId = (req.user as { id: number })?.id;
  const { id } = req.params;
  console.log(id)
  try {
    const plan =await prisma.travelPlan.findUnique({
      where: {
        user_id: userId,
        id: Number(id)
      },
      select: {id: true,user_id:true, title: true, date: true,description:true,created_at:true},
    })
    res.json(plan);
  } catch (err) {
    console.error('조회 실패:', err);
    res.status(500).json({ message: '여행 계획을 찾을 수 없습니다.' });
  }
};
