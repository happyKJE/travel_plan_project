import React, { useState, useRef, useEffect, useCallback } from "react";
import "../styles/reviewArea.css";
import "../styles/TravelReviews.css";
import addImageIcon from "../assets/images/addImage.png";
import submitIcon from "../assets/images/submit.png";
import { useModal } from "../components/ModalProvider.jsx";

const ReviewArea = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const contentRef = useRef(null);
    const fileInputRef = useRef(null);
    const { showModal } = useModal();

    // 이미지 서버 업로드 후 URL 받아서 content에 추가
    const handleImageUpload  = useCallback(async (file) => {
        const formData = new FormData();
        formData.append('image', file);
        try {
            const res = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/api/posts/image`, {
                method: 'POST',
                body: formData,
            });
            const data = await res.json();
            if (res.ok) {
                // 이미지 URL 받아서 content에 추가
                contentRef.current.innerHTML += `<img src="${import.meta.env.VITE_REACT_APP_API_URL+data.imageUrl}" alt="업로드 이미지" style="max-width: 100%; height: auto;" />`;
                setContent(contentRef.current.innerHTML);
            } else {
                showModal('이미지 업로드 실패');
            }
        } catch (err) {
            console.error('이미지 업로드 실패:', err);
            showModal('서버 오류: 이미지 업로드 실패');
        }
    }, []);

    const handleImageAdd = useCallback((e) => {
        const file = e.target.files[0];
        if (file) handleImageUpload(file);
    }, [handleImageUpload]);

    // 제출
    const handleSubmit = useCallback(async () => {
        if (!title.trim()) return showModal("제목을 입력해주세요.");
        if (!contentRef.current.innerHTML.trim()) return showModal("내용을 입력해주세요.");

        try {
            const res = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/api/posts/upload`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    title,
                    content: contentRef.current.innerHTML
                })
            });
            const data = await res.json();
            if (res.ok) showModal('여행 후기가 저장되었습니다.', '/lists');
            else showModal(data.message);
        } catch (err) {
            console.error('저장 실패:', err);
            showModal('서버 오류: 잠시 후 다시 시도해 주세요.');
        }
    }, [title, content, showModal]);

    // 내용 입력 시 상태 업데이트
    const handleContentChange = () => {
        setContent(contentRef.current.innerHTML);
    };

    useEffect(() => {
        if (contentRef.current.innerText.trim()) {
            contentRef.current.removeAttribute("data-placeholder");
        }
    }, [content]);

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
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <button onClick={() => fileInputRef.current.click()} className="imgButton">
                            <img src={addImageIcon} alt="이미지 추가" className="addNewImage" />
                        </button>
                        <input
                            type="file"
                            ref={fileInputRef}
                            style={{ display: "none" }}
                            accept="image/*"
                            onChange={handleImageAdd}
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
                        ></div>
                    </div>
                    <div className='submit-container'>
                        <button onClick={handleSubmit} className="sendButton">저장</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReviewArea;
