import React, { useState, useRef, useEffect } from "react";
import "../styles/reviewArea.css";
import addImageIcon from "../assets/addImage.png";
import submitIcon from "../assets/submit.png";

const ReviewArea = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const contentRef = useRef(null);
  const fileInputRef = useRef(null);

  // 제목 입력 핸들링
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  // 내용 입력 핸들링 (줄바꿈을 <p> 태그로 변환)
  const handleContentChange = () => {
    let contentHTML = contentRef.current.innerHTML;

    contentHTML = contentHTML
      .split("<br>")
      .map((line) => (line.trim() !== "" ? `<p>${line}</p>` : ""))
      .join("");

    setContent(contentHTML);
  };

  // 제출 처리
  const handleSubmit = () => {
    const reviewArray = [
      `<h2>${title}</h2>`, // 제목을 <h2>로 변환
      content, // 내용은 이미 <p> 태그로 변환된 상태
    ];

    if (reviewArray[0] === "<h2></h2>") {
      alert("제목을 입력해주세요.");
      return;
    }

    console.log(reviewArray);
    alert("제출이 완료되었습니다.");
    window.location.href = "/lists"; // 페이지 이동
  };

  // 이미지 추가 핸들링
  const handleImageAdd = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageUrl = reader.result;
        const imgTag = `<img src="${imageUrl}" alt="Uploaded Image" style="max-width: 100%; height: auto;" />`;
        contentRef.current.innerHTML += imgTag;
        setContent(contentRef.current.innerHTML);
      };
      reader.readAsDataURL(file);
    }
  };

  // 플레이스홀더 관리
  const handleFocus = () => {
    if (contentRef.current.innerHTML === "") {
      contentRef.current.innerText = "";
    }
  };

  const handleBlur = () => {
    if (contentRef.current.innerHTML === "<br>") {
      contentRef.current.innerText = "";
      contentRef.current.setAttribute("data-placeholder", "내용");
    }
  };

  useEffect(() => {
    if (contentRef.current.innerText.trim() !== "") {
      contentRef.current.removeAttribute("data-placeholder");
    }
  }, [content]);

  return (
    <div className="input-review">
      <div className="review-area-title">
        <input
          type="text"
          className="title"
          placeholder="제목"
          value={title}
          onChange={handleTitleChange}
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
            title="이미지 추가"
          />
        </button>
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          accept="image/*"
          onChange={handleImageAdd}
        />
        <button type="submit" className="sendButton" onClick={handleSubmit}>
          <img
            src={submitIcon}
            alt="제출"
            className="submitImage"
            title="제출"
          />
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
          onFocus={handleFocus}
          onBlur={handleBlur}
        ></div>
      </div>
    </div>
  );
};

export default ReviewArea;
