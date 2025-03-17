import React, { useState } from "react";
import "../styles/TravelReviews.css"; // 스타일 파일

const TravelReviews = ({ onClose }) => {
  const [selectedReview, setSelectedReview] = useState(null); // 선택된 후기 상태 추가

  // 샘플 후기 데이터
  const reviews = [
    {
      id: 1,
      user: "센텀맘",
      title: "미르꾸커피 광안 크림 커피 러버들 모여라!",
      content: "미르꾸커피 광안 크림 커피의 성지 ☕... 함께 봅시다!"
    },
    {
      id: 2,
      user: "멜론소다",
      title: "Cry Baby 가사 받음 오피셜이개단디줌",
      content: "들으면 가슴이 뻥 뚫리는 '히게단'의 노래... 불쌍한 소년의 일화를 그린 애니만큼의 노래..."
    },
    {
      id: 3,
      user: "촤노",
      title: "꾼은 바람이 싫어",
      content: "낚시 13일차... 바람이 너무 조용하고..."
    },
    {
      id: 4,
      user: "유오빠",
      title: "[리뷰] 소년의 시간 (결말, 줄거리, 뜻, 정보, 평점) - 넷플릭스 드라마",
      content: "소년의 시간은 2025년 3월 13일 공개될 넷플릭스 오리지널 시리즈로..."
    }
  ];

  return (
    <div className="travel-reviews-overlay">
      <div className="travel-reviews">
        <button className="close-btn" onClick={onClose}>×</button> {/* 닫기 버튼 */}
        
        {/* 선택된 리뷰가 없으면 리스트 표시 */}
        {!selectedReview ? (
          <>
            <h2 className="review-header">여행 후기 게시판</h2>
            <ul className="review-list">
              {reviews.map(review => (
                <li key={review.id} className="review-item" onClick={() => setSelectedReview(review)}>
                  <div className="review-meta">
                    <span className="review-author">{review.user}</span>
                  </div>
                  <h3 className="review-title">{review.title}</h3>
                  <p className="review-content-preview">{review.content}</p>
                </li>
              ))}
            </ul>
          </>
        ) : (
          /* 선택된 리뷰가 있으면 상세 페이지 표시 */
          <div className="review-detail">
            <button className="back-btn" onClick={() => setSelectedReview(null)}>← 뒤로가기</button>
            <h2 className="detail-title">{selectedReview.title}</h2>
            <p className="detail-content">{selectedReview.content}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TravelReviews;
