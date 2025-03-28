import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/MyPlanDetail.css';

const MyPlanDetail = () => {
    const { id } = useParams();
    const [plan, setPlan] = useState(null);

    useEffect(() => {
        const fetchPlan = async () => {
            try {
                const res = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/api/chat/plan/${id}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                const data = await res.json();

                let parsed;
                try {
                    const temp = JSON.parse(data.description);
                    parsed = Array.isArray(temp)
                        ? { days: temp }
                        : typeof temp === "string"
                            ? { days: JSON.parse(temp) }
                            : temp;
                } catch {
                    parsed = { rawText: data.description };
                }

                setPlan({
                    ...data,
                    ...parsed
                });
            } catch (err) {
                console.error("플랜 상세 조회 실패:", err);
            }
        };

        fetchPlan();
    }, [id]);

    if (!plan) return <div className="loading">로딩 중...</div>;

    const renderTimeSections = (day) => {
        const excludedKeys = ["type", "label", "day", "date", "locations", "night"];
        const timeKeys = Object.keys(day).filter(key => !excludedKeys.includes(key));

        return timeKeys.map((period) => (
            <div key={period} className="plan-time-section">
                <div className="section-header">🕒 {period}</div>
                <ul>
                    {(Array.isArray(day[period]) ? day[period] : [day[period]]).map((item, i) => (
                        <li key={i}>• {item}</li>
                    ))}
                </ul>
            </div>
        ));
    };

    return (
        <div className="plan-detail-container">
            <h2 className="trip-title">
                <span className="trip-location">📍 {plan.title}</span>
            </h2>

            {plan.days && plan.days.map((day, index) => (
                <div key={index} className="plan-day-card">
                    <h3>{day.label || day.day} - {day.date}</h3>
                    <div className="plan-day-content">
                        {day.locations?.length > 0 && (
                            <div className="plan-time-section">
                                <div className="section-header">📌 추천 관광지</div>
                                <ul>
                                    {day.locations.map((loc, i) => <li key={i}>• {loc}</li>)}
                                </ul>
                            </div>
                        )}

                        {renderTimeSections(day)}

                        {day.night?.length > 0 && (
                            <div className="plan-time-section">
                                <div className="section-header">🌙 밤에 가볼만한 곳</div>
                                    <div className="plan-summary-bubble">
                                        {day.night}
                                    </div>
                            </div>
                        )}
                    </div>
                </div>
            ))}

            {plan.summary && (
                <div className="plan-summary-bubble">
                    📝 {plan.summary}
                </div>
            )}

            {!plan.days && plan.rawText && (
                <pre className="raw-text">{plan.rawText}</pre>
            )}
        </div>
    );
};

export default MyPlanDetail;
