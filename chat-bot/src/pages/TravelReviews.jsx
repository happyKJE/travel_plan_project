import React, { useState } from "react";
import "../styles/TravelReviews.css"; // 스타일 파일
import reviews from "../data/reviewsData"; // ✅ 데이터 파일에서 가져오기
import TravelReviewDetail from "./TravelReviewDetail"; // ✅ 상세 페이지 컴포넌트 가져오기

const TravelReviews = ({ onClose }) => {
  const [selectedReview, setSelectedReview] = useState(null); // ✅ 선택된 후기 상태 추가

  return (
    <div className="travel-reviews-overlay">
      <div className="travel-reviews">
        {/* ✅ 상세 페이지가 없을 때는 목록을 표시 */}
        {!selectedReview ? (
          <>
            {/* 글쓰기 & 닫기 버튼 */}
            <div className="review-header-container">
              <div className="review-header">여행 후기 게시판</div>
              <div className="review-header-buttons">
                <button className="write-btn">글쓰기</button>
                <button className="close-btn" onClick={onClose}>×</button>
              </div>
            </div>

            {/* 후기 목록 */}
            <ul className="review-list">
              {reviews.map((review) => (
                <li
                  key={review.id}
                  className="review-item"
                  onClick={() => setSelectedReview(review)} // ✅ 클릭 시 상세 페이지로 이동
                >
                  <h3 className="review-title">{review.title}</h3>
                  <p className="review-content-preview">{review.content}</p>
                </li>
              ))}
            </ul>
          </>
        ) : (
          /* ✅ 상세 페이지 표시 */
          <TravelReviewDetail review={selectedReview} onBack={() => setSelectedReview(null)} />
        )}
      </div>
    </div>
  );
};

export default TravelReviews;
