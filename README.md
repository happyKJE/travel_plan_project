# AI 기반 개인 맞춤형 여행 일정 추천 서비스

GPT-3.5 기반으로 사용자의 여행 스타일, 인원, 날짜, 지역 정보를 분석하여
개인 맞춤형 여행 일정을 자동으로 생성하고 저장하는 풀스택 웹 애플리케이션입니다.

---

## 프로젝트 개요

| 항목 | 내용 |
| --- | --- |
| 프로젝트 기간 | 2025.03.04 ~ 2025.03.28 (약 4주) |
| 프로젝트 유형 | 팀 프로젝트 (Full-stack Web Application) |
| 개발 목적 | GPT 기반 여행 일정 자동 생성 및 저장 서비스 구현 |
| 개발 인원 | 5명 |
| 개발 환경 | macOS / Windows / Node.js / Vite / MySQL / OpenAI API |

---

## 주요 기능

| 구분 | 기능 설명 |
| --- | --- |
| 회원 관리 | 회원가입, 로그인, JWT 인증 기반 마이페이지 관리 |
| 여행 일정 생성 | 지역, 인원, 날짜, 여행 스타일 입력 후 GPT 일정 자동 생성 |
| 일정 저장 및 조회 | GPT 응답 파싱 후 JSON 형태로 저장, DB 연동 |
| 후기 게시판 | 후기 작성, 조회, 수정 기능 제공 |
| UI/UX 구성 | React Router 기반 모달 UI 및 Lazy Loading 구현 |

---

## 기술 스택

| 영역 | 기술 | 설명 |
| --- | --- | --- |
| Frontend | React 19, Vite 6, React Router v7 | SPA 및 모달 라우팅 구조 |
| Backend | Node.js, Express | REST API, JWT 인증 처리 |
| Database | MySQL2 | 사용자, 일정, 후기 데이터 관리 |
| AI Integration | OpenAI GPT-3.5 | 여행 일정 자동 생성 기능 |
| Auth & Security | JWT, bcryptjs | 사용자 인증, 비밀번호 암호화 |
| UI/UX | framer-motion, react-day-picker, moment | 애니메이션, 캘린더, 날짜 처리 |
| Utility | dotenv, cors, uuid | 환경변수 관리, CORS 설정, UUID 생성 |

---

## 시스템 구조

```

Client (React + Vite)
↓
Server (Express / Node.js)
↓
AI Engine (OpenAI GPT-3.5)
↓
Database (MySQL)

````

---

## 데이터베이스 구조

| 테이블 | 주요 컬럼 | 설명 |
| --- | --- | --- |
| USERS | id, name, email, password, created_at | 사용자 계정 정보 |
| TRAVEL_PLANS | id, user_id, title, date, description | GPT 생성 일정(JSON) 저장 |
| TRAVEL_POSTS | id, user_id, plan_id, title, content | 후기 게시글 및 일정 연동 |

---

## 주요 코드 예시

### GPT 일정 생성 API
```js
const response = await fetch("https://api.openai.com/v1/chat/completions", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
  },
  body: JSON.stringify({
    model: "gpt-3.5-turbo",
    messages: [
      { role: "system", content: systemMessage },
      { role: "user", content: userMessage },
    ],
    max_tokens: 1000,
    temperature: 0.7,
  }),
});
````

### GPT 응답 파싱 및 일정 저장

```js
const handleSaveButtonClick = async (planMessage) => {
  const lines = planMessage.text.split('\n');
  const days = parseDays(lines);
  const payload = { title, date, messages: JSON.stringify(days) };

  await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/api/chat/save`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify(payload),
  });
};
```

### JWT 인증 기반 일정 저장 API

```js
router.post('/save', authMiddleware, saveChat);

export const saveChat = async (req, res) => {
  const { title, date, messages } = req.body;
  await db.query(
    'INSERT INTO travel_plans (user_id, title, date, description) VALUES (?, ?, ?, ?)',
    [req.user.id, title, date, JSON.stringify(messages)]
  );
  res.json({ message: '저장 완료' });
};
```

---

## REST API 명세

| 기능       | Method | Endpoint           | 인증 |
| -------- | ------ | ------------------ | -- |
| 회원가입     | POST   | /api/auth/register | 없음 |
| 로그인      | POST   | /api/auth/login    | 없음 |
| 일정 저장    | POST   | /api/chat/save     | 필요 |
| 일정 목록 조회 | GET    | /api/users/mypage  | 필요 |
| 후기 작성    | POST   | /api/posts/upload  | 필요 |
| 후기 목록 조회 | GET    | /api/posts/list    | 없음 |

---

## 테스트 및 예외 처리

* JWT 인증 유효성 및 만료 토큰 검증
* GPT 응답 파싱 오류 및 포맷 불일치 예외 처리
* 입력 누락, 날짜 형식 오류 등 사용자 입력 검증
* CORS, DB 연결, 환경변수 로드 테스트
* React Suspense 및 Lazy Loading을 통한 렌더링 최적화

---

## 배운 점

* GPT 응답을 구조화하기 위한 Prompt 설계 및 파싱 기술 습득
* AI → 서버 → DB → UI로 이어지는 데이터 파이프라인 설계 경험
* JWT 인증 및 보안 처리 구조의 이해
* React Router 기반 모달 라우팅과 상태 관리 패턴 적용

---

## 한계 및 개선 방향

* GPT 응답의 일관성 제어 어려움
* 반응형 디자인 및 모바일 최적화 부족
* 지도 기반 일정 시각화 미구현
* 캐싱 및 API 호출 성능 개선 필요

---

## 설치 및 실행 방법

### 클라이언트 (Frontend)

```bash
cd client
npm install
npm run dev
```

### 서버 (Backend)

```bash
cd server
npm install
npm run start
```

### 환경변수 (.env 예시)

**Client**

```
VITE_REACT_APP_API_URL=http://localhost:3001
VITE_REACT_APP_CLIENT_ID=sk-xxxxxx
```

**Server**

```
PORT=3001
JWT_SECRET=your_secret_key
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=travel_plans
OPENAI_API_KEY=sk-xxxxxx
```

---

## 라이선스

이 프로젝트는 MIT License 하에 배포되었습니다.

---

본 프로젝트는 React + Node.js + MySQL + GPT-3.5를 기반으로 한
AI 여행 일정 추천 서비스입니다.
사용자의 입력을 바탕으로 GPT가 여행 계획을 생성하고,
이를 저장, 조회, 공유할 수 있는 실무형 풀스택 구조로 개발되었습니다.

``
