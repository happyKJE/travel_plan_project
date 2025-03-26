import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import '../styles/TravelDestination.css';
import destinations from '../data/TravelDestination.js';

const TravelDestination = () => {
  const ref = useRef();
  const location = useLocation();
  const isHome = (location.pathname === "/") || (location.pathname === "/plan-selection");

  const [selectedDestination, setSelectedDestination] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  const openModal = (destination) => setSelectedDestination(destination);
  const closeModal = () => setSelectedDestination(null);

  const filteredDestinations = destinations.filter((destination) =>
    destination.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  if (!isHome) return null;

  return (
    <>
      <div className="cover-wide-panel">
        <div
          className="bg"
          style={{
            backgroundImage:
              'url(https://ssmenews.com/news/data/20220224/p1065580876219594_687_thum.jpg)',
            height: '495px',
            backgroundPosition: '50% 100%',
            backgroundSize: 'cover',
          }}
        ></div>
        <div
          className="box"
          style={{
            maxWidth: 'none',
            marginLeft: '50px',
            marginRight: '50px',
            paddingTop: '58px',
            textAlign: 'center',
            backgroundColor: '#fff',
            fontFamily: "'Noto Sans KR', sans-serif"
          }}
        >
          <h2
            style={{
              display: 'block',
              marginBottom: '32px',
              padding: '2px 0 3px',
              fontWeight: '300',
              fontSize: '1.875em',
              lineHeight: '1.3333',
              color: '#000000',
            }}
          >
            "익숙하지만 낯선, 우리나라 여행으로 떠나는 시간"
          </h2>
          <p className="main_description">
            소중한 사람과 함께, 때로는 나 혼자.<br />
            아름다운 계절을 따라 걷다 보면 어느새 마음이 머무는 곳을 만나게 됩니다.<br />
            숨겨진 국내 여행지부터 꼭 가봐야 할 명소까지, 멀리 가지 않아도 좋습니다.<br />
            익숙하지만 새롭게 마주하는 여행의 순간들, 지금 이곳에서 함께 발견해보세요.
          </p>
          <a href="#list_title" className="btn view">
            목록보기
          </a>
        </div>
      </div>

      <section className="content-section" id="list_title" ref={ref}>
        {isVisible && (
          <>
            <h2>지금, 마음 가는 여행지를 찾아보세요</h2>
            <div className="bar"></div>
            <div className="search-container">
              <input
                type="text"
                placeholder="도시 이름을 입력하세요"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
            </div>
            <ul className="card-container">
              {filteredDestinations.map((destination) => (
                <li
                  key={destination.id}
                  className="card"
                  onClick={() => openModal(destination)}
                >
                  <img src={destination.image} alt={destination.koreanName} />
                  <div className="info">
                    <p>{destination.koreanName}</p>
                    <p>{destination.englishName}</p>
                  </div>
                </li>
              ))}
            </ul>
          </>
        )}

        {selectedDestination && (
          <div className="travel-destination-modal" onClick={closeModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <button className="close-btn" onClick={closeModal}>
                &times;
              </button>
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
    </>
  );
};

export default TravelDestination;