import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

interface AuthenticatedRequest extends Request {
  user?: string | JwtPayload;
}

const authMiddleware = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: '토큰 없음' });

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET as string);
    next();
  } catch (err) {
    res.status(401).json({ message: '유효하지 않은 토큰' });
  }
};

export default authMiddleware;
