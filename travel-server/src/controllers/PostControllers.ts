import { Request, Response } from 'express';
import  prisma  from '../config/PrismaClient.js';

interface AuthenticatedRequest extends Request {
    user?: { id: number };
    file?: Express.Multer.File;
}

// 후기 작성
export const createPost = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const userId = req.user?.id;
        if (!userId) return res.status(401).json({ message: '로그인이 필요합니다.' });

        const { title, content } = req.body;
        if (!title || !content) return res.status(400).json({ message: '제목과 내용을 입력해주세요.' });

        const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

        await prisma.travelPost.create({
            data: {
                user_id: userId,
                title,
                content,
                image_url: imageUrl ?? undefined,
            },
        });

        res.status(201).json({ message: '여행 후기 저장 성공' });
    } catch (err: any) {
        console.error('여행 후기 저장 실패:', err);
        res.status(500).json({ message: '서버 오류로 여행 후기 저장 실패', error: err.message });
    }
};

// 후기 리스트 조회
export const getAllPosts = async (req: Request, res: Response) => {
    try {
        const posts = await prisma.travelPost.findMany({
            select: {
                id: true,
                title: true,
                content: true,
                image_url: true,
                created_at: true,
            },
            orderBy: { created_at: 'desc' },
        });

        res.json(posts);
    } catch (err) {
        console.error('후기 조회 실패:', err);
        res.status(500).json({ message: '후기 조회 실패' });
    }
};

// 후기 상세 조회
export const getPostById = async (req: AuthenticatedRequest, res: Response) => {
    const { id } = req.params;
    const userId = req.user?.id;
    try {
        const post = await prisma.travelPost.findUnique({
            where: { id: Number(id),
                user_id: userId
             },
            include: {
                user: {
                  select: { name: true }
                }
              }
        });

        if (!post) return res.status(404).json({ message: '후기를 찾을 수 없습니다.' });

        res.json({
              id: post.id,
              title: post.title,
              content: post.content,
              image_url: post.image_url,
              created_at: post.created_at,
              user_name: post.user?.name || "익명"
            });
    } catch (err:any) {
        console.error('상세 조회 실패:', err);
        res.status(500).json({ message: '상세 조회 실패' });
    }
};
