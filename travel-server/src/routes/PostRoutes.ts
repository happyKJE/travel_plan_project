import express, { Request, Response } from 'express';
import multer, { FileFilterCallback } from 'multer';
import path from 'path';
import { createPost, getAllPosts, getPostById } from '../controllers/PostControllers.js'
import authMiddleware from '../middleware/authMiddleware.js';

// 사용자 정보와 파일이 포함된 요청 타입
interface MulterRequest extends Request {
    file?: Express.Multer.File;
}

// 저장 위치 및 파일명 설정
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

// 이미지 필터
const fileFilter = (
    req: Request,
    file: Express.Multer.File,
    cb: FileFilterCallback
) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('이미지 파일만 업로드 가능합니다.'));
    }
};

// multer 인스턴스
const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter
});

const router = express.Router();

//  이미지 업로드 전용 API
router.post('/image', upload.single('image'), (req: MulterRequest, res: Response) => {
    if (!req.file) {
        return res.status(400).json({ message: '파일이 업로드되지 않았습니다.' });
    }
    const imageUrl = `/uploads/${req.file.filename}`;
    res.json({ imageUrl });
});

//  파일 업로드 포함 후기 저장
router.post('/upload', authMiddleware, upload.single('image'), createPost);

//  후기 목록 조회
router.get('/list', getAllPosts);

//  후기 상세 조회
router.get('/detail/:id', getPostById);

export default router;
