import React from "react";
import { Link } from "react-router-dom";

const MyTravelPlans = ({ myPlans, setMyPlans }) => {

    const handleDelete = async (id) => {
        try {
            const res = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/api/chat/delete/${id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });

            if (res.ok) {
                // 삭제 성공 후 myPlans에서 해당 항목 제거
                setMyPlans(prevPlans => prevPlans.filter(plan => plan.id !== id));
            } else {
                const data = await res.json();
                alert(`삭제 실패: ${data.message}`);
            }
        } catch (err) {
            console.error('삭제 요청 실패:', err);
            alert('삭제 중 오류가 발생했습니다.');
        }
    };

    return (
        <section className="plans-section">
            <h3>나의 여행 일정</h3>
            {myPlans.length > 0 ? (
                <ul className="plan-list">
                    {myPlans.map(plan => (
                        <li key={plan.id} className="plan-item">
                            <Link to={`/mypage/plan/${plan.id}`} className="plan-link">
                                <strong>{plan.title}</strong>
                            </Link>
                            <button onClick={() => handleDelete(plan.id)} style={{ marginLeft: '10px' }}>
                                삭제
                            </button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>등록된 여행 일정이 없습니다.</p>
            )}
            <Link to="/">여행일정 만들러 가기</Link>
        </section>
    );
};

export default MyTravelPlans;