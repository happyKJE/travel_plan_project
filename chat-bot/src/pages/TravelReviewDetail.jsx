import React from "react";
import { useNavigate,useLocation } from "react-router-dom";
import "../styles/TravelReviews.css"; // 스타일 파일

const TravelReviewDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const review = location.state;
  return (
      <div className="travel-reviews-overlay">
          <div className="travel-reviews">
            <div className="review-detail">
              {/* ✅ 여행 후기 게시판 헤더 추가 */}
              <div className="review-header-container">
                <div className="review-header">여행 후기 게시판</div>
                <div className="review-header-buttons">
                  <button className="back-btn" onClick={()=>navigate(-1)}>← 뒤로가기</button>
                  {/*<button className="close-btn" onClick={()=>navigate('/')}>×</button>*/}
                </div>
              </div>

              {/* ✅ 후기 상세 내용 */}
              <div className="review-content">
                <h2>{review.title}</h2>
                <p>{review.content}</p>
              </div>
            </div>
          </div>
      </div>
  );
};

export default TravelReviewDetail;
