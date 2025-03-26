import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/TravelReviews.css";

const TravelReviewDetail = () => {
    const navigate = useNavigate();
    const { id } = useParams();   // ✅ /review/:id 파라미터 받기
    const [review, setReview] = useState(null);

    // 상세 데이터 조회
    useEffect(() => {
        const fetchReview = async () => {
            try {
                const res = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/api/posts/detail/${id}`);
                const data = await res.json();
                if (res.ok) setReview(data);
                else navigate(-1);  // 실패 시 뒤로가기
            } catch (err) {
                console.error("후기 불러오기 실패:", err);
                navigate(-1);
            }
        };
        fetchReview();
    }, [id, navigate]);

    if (!review) return <div className="loading">로딩 중...</div>;

    return (
        <div className="travel-reviews-overlay">
            <div className="travel-reviews">
                <div className="review-detail">
                    {/* ✅ 헤더 */}
                    <div className="review-header-container">
                        <div className="review-header">여행 후기 게시판</div>
                        <div className="review-header-buttons">
                            <button className="back-btn" onClick={() => navigate(-1)}>← 뒤로가기</button>
                        </div>
                    </div>

                    {/* ✅ 상세 내용 */}
                    <div className="review-content">
                        <h2>{review.title}</h2>
                        {/* 이미지가 있다면 표시 */}
                        {review.image_url && (
                            <img
                                src={`${import.meta.env.VITE_REACT_APP_API_URL}${review.image_url}`}
                                alt="후기 이미지"
                                style={{ maxWidth: '100%', borderRadius: '8px', margin: '20px 0' }}
                            />
                        )}
                        {/* ✅ content는 HTML로 출력 */}
                        <div
                            className="review-body"
                            dangerouslySetInnerHTML={{ __html: review.content }}
                        />
                        <p className="created-date">작성일: {new Date(review.created_at).toLocaleDateString()}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TravelReviewDetail;
