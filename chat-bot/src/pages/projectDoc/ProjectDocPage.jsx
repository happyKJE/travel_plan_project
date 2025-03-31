import React from "react";
import "../../styles/ProjectDocPage.css";

const ProjectDocPage = () => {
    return (
        <div className="doc-wrapper">
            <div className="doc-container">
                <h1 className="doc-title">✈️ AI 여행 플래너 프로젝트 기술 문서</h1>

                <div className="doc-scroll">
                    <section id="overview" className="doc-section">
                        <h2 className="doc-section-title">📌 프로젝트 개요</h2>
                        <p>
                            AI 기반 개인 맞춤형 여행 일정 추천 서비스입니다. 사용자의 조건(날짜, 인원, 지역, 스타일 등)에 따라 GPT-3.5가 여행 일정을 자동으로 생성합니다.
                        </p>
                    </section>

                    <section id="stack" className="doc-section">
                        <h2 className="doc-section-title">⚙️ 사용 기술 스택</h2>
                        <ul className="doc-list">
                            <li>Frontend: React 19, Vite 6, Framer Motion</li>
                            <li>Backend: Node.js, Express, MySQL2</li>
                            <li>AI: OpenAI GPT-3.5</li>
                            <li>인증: JWT</li>
                        </ul>
                    </section>

                    <section id="features" className="doc-section">
                        <h2 className="doc-section-title">🧪 주요 기능</h2>
                        <ul className="doc-list">
                            <li>로그인 및 회원가입, 마이페이지</li>
                            <li>GPT를 활용한 여행 일정 자동 추천</li>
                            <li>여행 플랜 저장 및 조회</li>
                            <li>여행 후기 등록 및 상세 조회</li>
                        </ul>
                    </section>

                    <section id="schema" className="doc-section">
                        <h2 className="doc-section-title">🗃️ 데이터베이스 스키마</h2>
                        <pre className="doc-code-block">
                            {`[USERS]
                            - id (PK)
                            - email, password, phoneNumber, name, created_at
                            
                            [TRAVEL_PLANS]
                            - id, user_id (FK), title, date, description, created_at
                            
                            [TRAVEL_POSTS]
                            - id, user_id (FK), title, content, image_url, created_at, updated_at`}
                        </pre>
                    </section>

                    <section id="api" className="doc-section">
                        <h2 className="doc-section-title">🔐 REST API 요약</h2>
                        <ul className="doc-list">
                            <li>POST /api/auth/register - 회원가입</li>
                            <li>POST /api/auth/login - 로그인</li>
                            <li>GET /api/users/mypage - 마이페이지 정보 조회</li>
                            <li>POST /api/chat/save - 플랜 저장</li>
                            <li>GET /api/chat/plan/:id - 플랜 상세 조회</li>
                        </ul>
                    </section>

                    <section id="review" className="doc-section">
                        <h2 className="doc-section-title">📌 자체 평가 요약</h2>
                        <p>
                            파인튜닝 시도는 실제 관광지 기반 데이터의 한계로 실패했으며, 대신 Prompt Engineering을 통해 더 정확하고 유저 맞춤형 여행 일정을 생성할 수 있었습니다. 구조적인 설계, 인증 시스템, UX 구현까지 실제 서비스 수준의 완성도를 달성했습니다.
                        </p>
                    </section>
                </div>

                <div className="doc-footer">
                    <button className='pdf-save-btn' onClick={() => window.print()}>📄 PDF 저장</button>
                </div>
            </div>
        </div>
    );
};

export default ProjectDocPage;
