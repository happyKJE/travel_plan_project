/**
 * @file travelDestination.jsx
 * @description 맞춤형 여행을 위한 질문 옵션 표출 컨포넌트
 * @author jungeun
 * @created 2025-03-20
 * @lastModifiedBy jungeun
 * @lastModifiedDate 2025-03-20
 */

import React, { useState } from "react";
import "../styles/TravelDestination.css";
import regions from "../data/travelDestination";

const TravelDestination = () => {
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const openModal = (destination) => {
    setSelectedDestination(destination);
  };

  const closeModal = () => {
    setSelectedDestination(null);
  };

  const filteredRegions = regions.filter((region) =>
    region.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="content-section">
      <h2>어디로 여행을 떠나시겠어요?</h2>
      <div className="search-container">
        <input
          type="text"
          placeholder="지역 이름을 입력하세요"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>
      <div className="card-container">
        {filteredRegions.map((destination) => (
          <div
            key={destination.id}
            className="card"
            onClick={() => openModal(destination)}
          >
            <img src={destination.image} alt={destination.name} />
            <div className="info">
              <p>{destination.name}</p>
            </div>
          </div>
        ))}
      </div>

      {selectedDestination && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={closeModal}>
              &times;
            </button>
            <div className="modal-info">
              <h3>{selectedDestination.name}</h3>
              <p className="description">{selectedDestination.description}</p>
              <div className="travel-details">
                <div className="detail-row">
                  <div className="detail-item">
                    <span className="label">✈️ 항공</span>
                    <span className="value">{selectedDestination.flight}</span>
                  </div>
                  <div className="detail-item">
                    <span className="label">🪪 비자</span>
                    <span className="value">{selectedDestination.visa}</span>
                  </div>
                </div>
                <div className="detail-row">
                  <div className="detail-item">
                    <span className="label">🔌 전압</span>
                    <span className="value">{selectedDestination.voltage}</span>
                  </div>
                  <div className="detail-item">
                    <span className="label">🕒 시차</span>
                    <span className="value">{selectedDestination.time}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-image">
              <img
                src={selectedDestination.image}
                alt={selectedDestination.name}
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default TravelDestination;
