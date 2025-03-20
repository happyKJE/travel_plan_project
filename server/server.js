import { Hono } from "hono";
import { readFileSync, writeFileSync } from "fs";
import { serve } from "@hono/node-server"; // Hono 서버 실행을 위한 모듈
import { cors } from "hono/cors"; // CORS 미들웨어 추가

const app = new Hono();
const filePath = "./ReviewsData.json";

// ✅ CORS 허용 설정 추가
app.use(
  "/reviews",
  cors({
    origin: "*", // 모든 도메인 허용
    allowMethods: ["GET", "POST"],
  }),
);

// 서버 시작 로그 추가
console.log("🚀 서버가 실행 중입니다! http://localhost:3000");

// 리뷰 목록 가져오기
app.get("/reviews", async (c) => {
  const data = JSON.parse(readFileSync(filePath, "utf-8"));
  return c.json(data);
});

// 리뷰 추가하기
app.post("/reviews", async (c) => {
  const newReview = await c.req.json();
  let reviews = JSON.parse(readFileSync(filePath, "utf-8"));

  newReview.id = reviews.length + 1;
  reviews.push(newReview);

  writeFileSync(filePath, JSON.stringify(reviews, null, 2), "utf-8");
  return c.json({ message: "리뷰 추가 완료", review: newReview });
});

// Hono 서버 실행
serve(app);
