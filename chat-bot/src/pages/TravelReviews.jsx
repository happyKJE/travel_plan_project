import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/TravelReviews.css";

const TravelReviews = () => {
    const navigate = useNavigate();
    const [reviews, setReviews] = useState([]);

    // 리스트 조회
    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const res = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/api/posts/list`);
                const data = await res.json();
                if (res.ok) setReviews(data);
                else console.error("후기 목록 조회 실패:", data.message);
                console.log(data);
            } catch (err) {
                console.error("서버 오류:", err);
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
                        <button className="write-btn" onClick={() => navigate('/reviewArea')}>글쓰기</button>
                        {/*<button className="close-btn" onClick={() => navigate('/')}>×</button>*/}
                    </div>
                </div>

                {/* 후기 목록 */}
                <ul className="review-list">
                    {reviews.map((review) => (
                        <li
                            key={review.id}
                            className="review-item"
                            onClick={() => navigate(`/review/${review.id}`, { state: review.id })}
                        >
                            <h3 className="review-title">{review.title}</h3>
                            <div
                                className="review-content-preview"
                                dangerouslySetInnerHTML={{ __html: review.content.slice(0, 100) + "..." }}
                            />
                        </li>
                    ))}
                    {reviews.length === 0 && <p>등록된 후기가 없습니다.</p>}
                </ul>
            </div>
        </div>
    );
};

export default TravelReviews;
