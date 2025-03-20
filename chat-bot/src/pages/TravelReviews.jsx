import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/TravelReviews.css";

const TravelReviews = () => {
  const navigate = useNavigate();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch("http://localhost:3000/reviews");
        if (response.ok) {
          const data = await response.json();
          setReviews(data);
        } else {
          console.error("리뷰 데이터를 불러오는데 실패했습니다.");
        }
      } catch (error) {
        console.error("서버 오류 발생:", error);
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
              className="write-btn"
              onClick={() => navigate("/ReviewArea")}
            >
              글쓰기
            </button>
          </div>
        </div>

        <ul className="review-list">
          {reviews.map((review) => (
            <li
              key={review.id}
              className="review-item"
              onClick={() =>
                navigate(`/review/${review.id}`, { state: review })
              }
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
