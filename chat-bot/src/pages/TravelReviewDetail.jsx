import React from 'react';
import { useParams } from 'react-router-dom';

const TravelReviewDetail = () => {
    const { reviewId } = useParams();

    // 여행 후기 샘플 데이터 (실제 DB 연동 시 fetch 사용 가능)
    const reviews = {
        1: { title: "제주도 여행 후기", content: "제주도에서 멋진 자연을 만끽했어요!" },
        2: { title: "부산 맛집 투어", content: "부산에서 먹었던 음식들이 너무 맛있었어요!" },
        3: { title: "강릉 여행", content: "강릉 바다와 커피거리가 정말 좋았어요!" }
    };

    // 선택한 후기가 존재하면 표시, 없으면 "후기 없음"
    const review = reviews[reviewId] || { title: "후기 없음", content: "해당 후기를 찾을 수 없습니다." };

    return (
        <div className="travel-review-detail">
            <h2>{review.title}</h2>
            <p>{review.content}</p>
        </div>
    );
};

export default TravelReviewDetail;
