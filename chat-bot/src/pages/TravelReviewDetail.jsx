import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/TravelReviews.css";

const TravelReviewDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const review = location.state;

  return (
    <div className="travel-reviews-overlay">
      <div className="travel-reviews">
        <div className="review-detail">
          <div className="review-header-container">
            <div className="review-header">여행 후기 게시판</div>
            <div className="review-header-buttons">
              <button className="back-btn" onClick={() => navigate(-1)}>
                ← 뒤로가기
              </button>
            </div>
          </div>

          <div className="review-content">
            <h2>{review.title}</h2>
            <p>
              {review.content.split("\n").map((line, index) => (
                <p key={index}>{line}</p>
              ))}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TravelReviewDetail;
