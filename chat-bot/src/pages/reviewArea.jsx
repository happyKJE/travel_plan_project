import React, { useState, useRef, useEffect } from 'react';
import '../styles/reviewArea.css';

const ReviewArea = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const contentRef = useRef(null); // contenteditable에 접근하기 위한 ref
    const fileInputRef = useRef(null); // 이미지 파일 input을 위한 ref

    // 제목 변경 처리
    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    // 내용 변경 처리
    const handleContentChange = () => {
        let contentHTML = contentRef.current.innerHTML;
    
        // 내용에서 이미지 태그는 그대로 두고, 텍스트 부분만 <p> 태그로 감싸기
        contentHTML = contentHTML
            .split('<br>') // <br> 태그를 기준으로 나눔
            .map(line => {
                // 빈 줄은 그대로 두고, 텍스트가 있는 줄만 <p> 태그로 감쌈
                if (line.trim() !== '') {
                    return `<p>${line}</p>`; // 각 줄을 <p>로 감쌈
                }
                return ''; // 빈 줄은 그대로 둠
            })
            .join(''); // 다시 합침
    
        setContent(contentHTML); // 상태를 업데이트
    };

    // 제출 처리 함수
    const handleSubmit = () => {
        const reviewArray = [
            `<h2>${title}</h2>`, // 제목에 <h2> 태그 추가
            content, // 내용은 이미 <p> 태그로 처리된 상태
        ];

        if (reviewArray[0] === '<h2></h2>') { // 제목이 비어있는 경우
            alert('제목을 입력해주세요.');
            return;
        }

        console.log(reviewArray); // 배열을 콘솔에 출력 (임시 작성)
        alert('제출이 완료되었습니다.');
        window.location.href = '/lists'; // 페이지 이동
    };

    // 이미지 추가 처리 함수
    const handleImageAdd = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const imageUrl = reader.result;
                const imgTag = `<img src="${imageUrl}" alt="Uploaded Image" style="max-width: 100%; height: auto;" />`;
                contentRef.current.innerHTML += imgTag; // 이미지 태그를 contenteditable 영역에 추가
                setContent(contentRef.current.innerHTML); // 상태를 업데이트
            };
            reader.readAsDataURL(file); // 이미지를 Base64로 읽기
        }
    };

    // 내용 입력 여부에 따른 placeholder 관리
    const handleFocus = () => {
        const contentValue = contentRef.current.innerHTML;

        if (contentValue === '') {
            contentRef.current.innerText = ''; // 입력이 없을 때 초기화
        }
    };

    const handleBlur = () => {
        const contentValue = contentRef.current.innerHTML;

        if (contentValue === '<br>') {
            contentRef.current.innerText = ''; // 블러시 되었을 때 내용이 없으면 placeholder 적용
            contentRef.current.setAttribute('data-placeholder', '내용'); // 내용이 없을 때 placeholder 설정
        }
    };

    // `contenteditable`에 내용이 있는지 체크하여 placeholder 표시 여부 결정
    useEffect(() => {
        const contentValue = contentRef.current.innerText.trim();

        if (contentValue !== '') {
            contentRef.current.removeAttribute('data-placeholder'); // 내용이 있으면 placeholder 제거
        }
    }, [content]);

    return (
        <div className='input-review'>
            <div className='review-area-title'>
                <input
                    type="text"
                    className='title'
                    placeholder='제목'
                    value={title}
                    onChange={handleTitleChange}
                />
                <button
                    type='button'
                    className='imgButton'
                    onClick={() => fileInputRef.current.click()}
                >
                    <img src='/addImage.png' alt='이미지 추가' className='addNewImage' title="이미지 추가" />
                </button>
                <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: 'none' }} // 파일 입력을 숨김
                    onChange={handleImageAdd} // 이미지가 추가되면 처리
                    accept="image/*" // 이미지 파일만 선택 가능
                />
                <button
                    type='submit'
                    className='sendButton'
                    onClick={handleSubmit}
                >
                    <img src='/submit.png' alt='제출' className='submitImage' title="제출" />
                </button>
            </div>
            <hr />
            <div className='review-area-content'>
                <div
                    className="content"
                    contentEditable="true"
                    ref={contentRef} // ref 연결
                    onInput={handleContentChange}
                    onFocus={handleFocus} // focus 시 초기화
                    onBlur={handleBlur} // blur 시 placeholder 관리
                    data-placeholder="내용" // 초기 placeholder 텍스트 설정
                >
                </div>
            </div>
        </div>
    );
};

export default ReviewArea;