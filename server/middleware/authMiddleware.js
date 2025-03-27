import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
  // ✅ Authorization 헤더에서 Bearer 토큰 추출
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    console.log('토큰 없음');
    return res.status(401).json({ message: '토큰 없음' });
  }

  try {
    // ✅ 토큰 검증 후 사용자 정보 저장
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;  // { id, email, ... }
    next();
  } catch (err) {
    console.error('유효하지 않은 토큰:', err.message);
    return res.status(401).json({ message: '유효하지 않은 토큰' });
  }
};

export default authMiddleware;
