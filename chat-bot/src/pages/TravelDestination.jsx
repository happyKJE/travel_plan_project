/**
 * @file travelDestination.jsx
 * @description 맞춤형 여행을 위한 질문 옵션 표출 컨포넌트
 * @author jungeun
 * @created 2025-03-20
 * @lastModifiedBy sunny
 * @lastModifiedDate 2025-03-24
 */

import React, { useState } from 'react';
import '../styles/TravelDestination.css';
import destinations from '../data/TravelDestination.js';

const TravelDestination = () => {
    const [selectedDestination, setSelectedDestination] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    const openModal = (destination) => {
        setSelectedDestination(destination);
    };

    const closeModal = () => {
        setSelectedDestination(null);
    };

    // 검색어를 기반으로 필터링 //
    const filteredDestinations = destinations.filter(destination =>
        destination.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <section className="content-section">
            <h2>어디로 여행을 떠나시겠어요?</h2>
            <div className="search-container">
                <p>도시를 검색해 보세요.</p> 
                {/*검색어 입력창에서 실시간으로 searchQuery 업데이트*/}
                <input
                    type="text"
                    placeholder="도시 이름을 입력하세요"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="search-input"
                />
            </div>
            <ul className="card-container">
                {filteredDestinations.map(destination => (
                    <li key={destination.id} className="card" onClick={() => openModal(destination)}>
                        <img src={destination.image} alt={destination.name} />
                        <div className="info">
                            <p>{destination.name}</p>
                        </div>
                    </li>
                ))}
            </ul>

            {selectedDestination && (
                <div className="travel-destination-modal" onClick={closeModal}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <button className="close-btn" onClick={closeModal}>&times;</button>
                        <div className="modal-info">
                            <h3>{selectedDestination.name}</h3>
                            <p className="description">{selectedDestination.description}</p>
                            <div className="travel-details">
                                <div className="detail-item">
                                    <span className="label">✈️ 항공:</span>
                                    <span>{selectedDestination.flight}</span>
                                </div>
                                <div className="detail-item">
                                    <span className="label">🪪비자:</span>
                                    <span>{selectedDestination.visa}</span>
                                </div>
                                <div className="detail-item">
                                    <span className="label">🔌전압:</span>
                                    <span>{selectedDestination.voltage}</span>
                                </div>
                                <div className="detail-item">
                                    <span className="label">🕒시차:</span>
                                    <span>{selectedDestination.time}</span>
                                </div>
                            </div>
                        </div>
                        <div className="modal-image">
                            <img src={selectedDestination.image} alt={selectedDestination.name} />
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default TravelDestination;