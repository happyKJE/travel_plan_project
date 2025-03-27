import express from 'express';
import multer from 'multer';
import { createPost, getAllPosts, getPostById} from '../controllers/PostsControllers.js';
import authMiddleware from '../middleware/authMiddleware.js';


// multer 저장 설정
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // 저장 폴더
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname); // 고유 파일명 생성
    }
});


// multer 인스턴스 생성
const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB 제한
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith('image/')) cb(null, true);
        else cb(new Error('이미지 파일만 업로드 가능합니다.'));
    },
});

const router = express.Router();

// 이미지 업로드 전용 API
router.post('/image', upload.single('image'), (req, res) => {
    const imageUrl = `/uploads/${req.file.filename}`; // 프론트에서 사용할 이미지 경로 반환
    res.json({ imageUrl });
});

// 파일 업로드 포함한 후기 저장 라우터
router.post('/upload', authMiddleware, createPost);

// 목록 조회
router.get('/list', getAllPosts);

// 상세 조회
router.get('/detail/:id', getPostById);

export default router;
