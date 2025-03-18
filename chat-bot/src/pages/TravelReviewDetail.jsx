import React from "react";

const TravelReviewDetail = ({ review, onBack }) => {
  return (
    <div className="review-detail">
      {/* ✅ 여행 후기 게시판 헤더 추가 */}
      <div className="review-header-container">
        <div className="review-header">여행 후기 게시판</div>
        <div className="review-header-buttons">
          <button className="back-btn" onClick={onBack}>← 뒤로가기</button>
          <button className="close-btn" onClick={onBack}>×</button>
        </div>
      </div>

      {/* ✅ 후기 상세 내용 */}
      <div className="review-content">
        <h2>{review.title}</h2>
        <p>{review.content}</p>
      </div>
    </div>
  );
};

export default TravelReviewDetail;
