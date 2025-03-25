import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/TravelReviews.css"; // 스타일 파일
import reviews from "../data/reviewsData"; //  데이터 파일에서 가져오기

const TravelReviews = () => {
    const navigate = useNavigate();
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
                            onClick={() => navigate(`/review/${review.id}`, { state: review })} //  클릭 시 상세 페이지로 이동
                        >
                            <h3 className="review-title">{review.title}</h3>
                            <p className="review-content-preview">{review.content}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default TravelReviews;
