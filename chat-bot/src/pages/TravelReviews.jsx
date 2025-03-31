import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/TravelReviews.css";
import useStore from "../context/UseStore.jsx";

const TravelReviews = () => {
    const navigate = useNavigate();
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const { state } = useStore();
    const isLoggedIn = state.isLoggedIn;

    // 리스트 조회
    useEffect(() => {
    const fetchReviews = async () => {
        try {
            const res = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/api/posts/list`);
            const data = await res.json();
            if (res.ok) setReviews(data);
            else console.error("후기 목록 조회 실패:", data.message);
        } catch (err) {
            console.error("서버 오류:", err);
        } finally {
            setLoading(false); // 항상 로딩 종료
        }
    };
    fetchReviews();
}, []);


    return (
        <div className="travel-reviews-overlay">
            <div className="travel-reviews">
                <div className="review-header-container">
                    <div className="review-header">여행 후기 게시판</div>
                    <div className="review-header-buttons">
                        <button
                            className={`write-btn ${!isLoggedIn ? "disabled tooltip-wrapper" : ""}`}
                            onClick={() => isLoggedIn && navigate('/reviewArea')}
                            disabled={!isLoggedIn}
                        >
                            글쓰기
                            {!isLoggedIn && <span className="tooltip-text">로그인 후 이용해주세요</span>}
                        </button>
                    </div>
                </div>

                <ul className="review-list">
                    {loading ? (
                        <div className="loading-indicator"><i className='bx bxs-plane-alt'></i></div>
                    ) : reviews.length === 0 ? (
                        <p className="no-review-message">아직 작성된 후기가 없어요. 첫 번째 여행 이야기를 남겨보세요 ✍️</p>
                    ) : (
                        reviews.map((review) => (
                            <li
                                key={review.id}
                                className="review-item"
                                onClick={() => navigate(`/review/${review.id}`, { state: review.id })}
                            >
                                <h3 className="review-title">{review.title}</h3>
                                <div
                                    className="review-content-preview"
                                    dangerouslySetInnerHTML={{
                                        __html:
                                            review.content.length > 100
                                                ? review.content.slice(0, 100) + "..."
                                                : review.content,
                                    }}
                                />
                                <div className="review-meta">
                                    <span>✍️ {review.user_name || "익명"}</span>
                                    <span>📅 {new Date(review.created_at).toLocaleDateString("ko-KR")}</span>
                                </div>
                            </li>
                        ))
                    )}
                </ul>
            </div>
        </div>
    );
};

export default TravelReviews;
