import prisma from '../config/PrismaClient.js';
import { Request, Response } from 'express';
import { JwtPayload } from 'jsonwebtoken';

interface AuthenticatedRequest extends Request {
  user?: {
    id: number;
    email?: string;
  } | JwtPayload;
}

//마이페이지 조회 (내 정보 + 여행 플랜 리스트)
export const getMyPage = async (req:AuthenticatedRequest, res:Response) => {
  const userId =  (req.user as { id: number })?.id;
  try {
    const userInfo = await prisma.user.findUnique({
      where: { id: userId },
      select: { name: true, email: true, phoneNumber: true },
    });

    const plans = await prisma.travelPlan.findMany({
      where: { user_id: userId },
      select: { id: true, title: true, date: true },
    });

    res.json({ userInfo, plans });
  } catch (err:any) {
    console.error('마이페이지 조회 실패:', err);
    res.status(500).json({ message: '마이페이지 조회 실패', error: err.message });
  }
};
