import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/ReviewArea.css";
import addImageIcon from "../assets/addImage.png";
import submitIcon from "../assets/submit.png";

const ReviewArea = () => {
  const [title, setTitle] = useState("");
  const [user, setUser] = useState("");
  const [content, setContent] = useState("");
  const contentRef = useRef(null);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleUserChange = (e) => setUser(e.target.value);
  const handleContentChange = () => {
    setContent(contentRef.current.innerText); // HTML 태그 없이 순수한 텍스트만 저장
  };

  // 서버에 리뷰 데이터 추가 요청
  const handleSubmit = async () => {
    if (!title.trim() || !user.trim()) {
      alert("제목과 닉네임을 입력해주세요.");
      return;
    }

    const newReview = { user, title, content };

    try {
      const response = await fetch("http://localhost:3000/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newReview),
      });

      if (response.ok) {
        alert("제출이 완료되었습니다.");
        navigate("/travelReviews");
      } else {
        alert("리뷰 추가에 실패했습니다.");
      }
    } catch (error) {
      console.error("리뷰 추가 중 오류 발생:", error);
      alert("서버 오류 발생");
    }
  };

  return (
    <div className="travel-reviews-overlay">
      <div className="travel-reviews">
        <div className="input-review">
          <div className="review-area-title">
            <input
              type="text"
              className="title"
              placeholder="제목"
              value={title}
              onChange={handleTitleChange}
            />
            <input
              type="text"
              className="user"
              placeholder="닉네임"
              value={user}
              onChange={handleUserChange}
            />
            <button
              type="button"
              className="imgButton"
              onClick={() => fileInputRef.current.click()}
            >
              <img
                src={addImageIcon}
                alt="이미지 추가"
                className="addNewImage"
              />
            </button>
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: "none" }}
              accept="image/*"
            />
            <button type="submit" className="sendButton" onClick={handleSubmit}>
              <img src={submitIcon} alt="제출" className="submitImage" />
            </button>
          </div>
          <hr />
          <div className="review-area-content">
            <div
              className="content"
              contentEditable="true"
              ref={contentRef}
              data-placeholder="내용"
              onInput={handleContentChange}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewArea;
