import React, { useState, useRef, useEffect } from "react";
import "../styles/reviewArea.css";
import "../styles/TravelReviews.css"; // 스타일 파일
import addImageIcon from "../assets/addImage.png";
import submitIcon from "../assets/submit.png";

const ReviewArea = () => {
  const [title, setTitle] = useState("");
  const [nickname, setNickname] = useState("");
  const [content, setContent] = useState("");

  const contentRef = useRef(null);
  const fileInputRef = useRef(null);
  const titleRef = useRef(null);  // 제목 입력 필드 참조
  const nicknameRef = useRef(null);  // 닉네임 입력 필드 참조
  const submitButtonRef = useRef(null); // 제출 버튼 참조
  const imgButtonRef = useRef(null);  // 이미지 추가 버튼 참조

  // 제목 입력 핸들링
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  // 닉네임 입력 핸들링
  const handleNicknameChange = (e) => {
    setNickname(e.target.value);
  }

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
      `<h4>${nickname}</h4>`, // 닉네임을 <h4>로 변환
      content, // 내용은 이미 <p> 태그로 변환된 상태
    ];

    if (reviewArray[0] === "<h2></h2>") {
      alert("제목을 입력해주세요.");
      return;
    }

    if (reviewArray[1] === "<h4></h4>"){
      alert("닉네임을 입력해주세요.");
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

  // input-review 영역 클릭 시 contentRef 포커스
  const handleContainerClick = (e) => {
    // 제목, 닉네임, 이미지 추가 버튼, 제출 버튼을 클릭했을 때는 포커스를 설정하지 않음
    if (
      contentRef.current.contains(e.target) ||
      e.target === contentRef.current ||
      (titleRef.current && titleRef.current.contains(e.target)) ||
      (nicknameRef.current && nicknameRef.current.contains(e.target)) ||
      (submitButtonRef.current && submitButtonRef.current.contains(e.target)) ||
      (imgButtonRef.current && imgButtonRef.current.contains(e.target))
    ) {
      return;
    }
    
    // 그 외의 빈 공간을 클릭하면 content에 포커스를 설정
    contentRef.current.focus();
  };

  return (
      <div className="travel-reviews-overlay">
        <div className="travel-reviews">
          <div className="input-review" onClick={handleContainerClick}>
            <div className="review-area-title">
              <input
                type="text"
                className="title"
                placeholder="제목"
                value={title}
                onChange={handleTitleChange}
                ref={titleRef} // 제목 ref 추가
              />
              <button
                type="button"
                className="imgButton"
                onClick={() => fileInputRef.current.click()}
                ref={imgButtonRef} // 이미지 추가 버튼 ref 추가
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
              <button
                type="submit"
                className="sendButton"
                onClick={handleSubmit}
                ref={submitButtonRef} // 제출 버튼 ref 추가
              >
                <img
                  src={submitIcon}
                  alt="제출용"
                  className="submitImage"
                  title="제출"
                />
              </button>
            </div>
            <hr />
            <div className="review-area-nickname">
              <h4>닉네임: </h4>
              <input 
                type="text"
                placeholder="닉네임을 입력해주세요." 
                className="nickname-field"
                value={nickname}
                onChange={handleNicknameChange}
                ref={nicknameRef} // 닉네임 ref 추가
              />
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
        </div>
      </div>
  );
};

export default ReviewArea;