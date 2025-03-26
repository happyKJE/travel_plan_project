/**
 * @file travelDestination.jsx
 * @description 맞춤형 여행을 위한 질문 옵션 표출 컨포넌트,검색어 입력창에서 실시간으로 searchQuery 업데이트
 * @author jungeun
 * @created 2025-03-20
 * @lastModifiedBy sunny
 * @lastModifiedDate 2025-03-26
 */

import React, {useEffect, useRef, useState} from 'react';
import '../styles/TravelDestination.css';
import destinations from '../data/TravelDestination.js';

const TravelDestination = () => {
    const ref = useRef();
    const [selectedDestination, setSelectedDestination] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [isVisible, setIsVisible] = useState(false);
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

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsVisible(entry.isIntersecting);
            },
            { threshold: 0.1 }
        );

        if (ref.current) observer.observe(ref.current);

        return () => {
            if (ref.current) observer.unobserve(ref.current);
        };
    }, []);

    return (
        <>
        <div className="cover-wide-panel">
            <div
                className="bg"
                style={{
                backgroundImage: "url(https://cdn.ardentnews.co.kr/news/photo/202404/3109_14358_583.jpg)",
                height: "495px",
                backgroundPosition: "50% 100%",
                backgroundSize: "cover"
                }}
            ></div>
            <div className="box"
                style={{
                    maxWidth: 'none',
                    marginLeft: '50px',
                    marginRight: '50px',
                    margin:' -100px auto 0',
                    paddingTop: '58px',
                    textAlign: 'center',
                    backgroundColor: '#fff',
                    fontFamily: "'Noto Sans KR', sans-serif"    
                    }}
            >
                <h2
                    style={{
                        display: 'block',
                        marginBottom:'32px',
                        padding: '2px 0 3px',
                        fontWeight: '300',
                        fontSize: '1.875em',
                        lineHeight: '1.3333',
                        color: '#000000'
                    }}
                >"익숙하지만 낯선, 우리나라 여행으로 떠나는 시간"</h2>
                <p className="main_description">
                    소중한 사람과 함께, 때로는 나 혼자.
                    아름다운 계절을 따라 걷다 보면 어느새 마음이 머무는 곳을 만나게 됩니다.
                    숨겨진 국내 여행지부터 꼭 가봐야 할 명소까지,멀리 가지 않아도 좋습니다.
                    익숙하지만 새롭게 마주하는 여행의 순간들,
                    지금 이곳에서 함께 발견해보세요.
                </p>
                <a href="#list_title" className="btn view">목록보기</a>
            </div>
        </div>
        <section className="content-section"  id="list_title" ref={ref}>
            {isVisible && (
                <>
                    <h2>지금, 마음 가는 여행지를 찾아보세요</h2>
                    <div className='bar'></div>
                    <div className="search-container">
                        {/*검색어 입력창에서 실시간으로 searchQuery 업데이트*/}
                        <input
                            type="text"
                            placeholder="도시 이름을 입력하세요"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="search-input"
                        />
                        <img alt="svgImg" width='40px' style={{position:'relative', left: '13rem', top:'5px'}} src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIj8+PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciICB2aWV3Qm94PSIwIDAgMTI4IDEyOCIgd2lkdGg9IjEyOHB4IiBoZWlnaHQ9IjEyOHB4Ij4gICAgPHBhdGggZD0iTSA1Ni41OTk2MDkgMjEuNTk5NjA5IEMgMzQuMDk5NjA5IDIxLjU5OTYwOSAxNS44MDA3ODEgNDAuMTAwNzgxIDE1LjgwMDc4MSA2Mi44MDA3ODEgQyAxNS44MDA3ODEgODUuNjAwNzgxIDM0LjA5OTYwOSAxMDQgNTYuNTk5NjA5IDEwNCBDIDY2Ljg5OTYwOSAxMDQgNzYuMyAxMDAuMDk5MjIgODMuNSA5My42OTkyMTkgTCA4NS44MDA3ODEgOTYgTCA4My42OTkyMTkgOTguMTk5MjE5IEMgODIuNDk5MjE5IDk5LjM5OTIxOSA4Mi40OTkyMTkgMTAxLjMgODMuNjk5MjE5IDEwMi41IEwgMTAxLjY5OTIyIDEyMC42OTkyMiBDIDEwMi4yOTkyMiAxMjEuMjk5MjIgMTAzLjAwMDc4IDEyMS41OTk2MSAxMDMuODAwNzggMTIxLjU5OTYxIEMgMTA0LjYwMDc4IDEyMS41OTk2MSAxMDUuNDAwMzkgMTIxLjI5OTIyIDEwNS45MDAzOSAxMjAuNjk5MjIgTCAxMTMuOTAwMzkgMTEyLjU5OTYxIEMgMTE1LjAwMDM5IDExMS4zOTk2MSAxMTUuMDAwNzggMTA5LjUwMDM5IDExMy44MDA3OCAxMDguNDAwMzkgTCA5NS44MDA3ODEgOTAuMTk5MjE5IEMgOTUuMjAwNzgxIDg5LjU5OTIxOSA5NC40OTkyMTkgODkuMzAwNzgxIDkzLjY5OTIxOSA4OS4zMDA3ODEgQyA5Mi44OTkyMTkgODkuMzAwNzgxIDkyLjA5OTYwOSA4OS41OTkyMTkgOTEuNTk5NjA5IDkwLjE5OTIxOSBMIDg5LjUgOTIuNDAwMzkxIEwgODcuMTk5MjE5IDkwIEMgOTMuNDk5MjE5IDgyLjcgOTcuNDAwMzkxIDczLjIwMDc4MSA5Ny40MDAzOTEgNjIuODAwNzgxIEMgOTcuNDAwMzkxIDQwLjEwMDc4MSA3OS4wOTk2MDkgMjEuNTk5NjA5IDU2LjU5OTYwOSAyMS41OTk2MDkgeiBNIDU2LjU5OTYwOSAyNy42OTkyMTkgQyA3NS43OTk2MDkgMjcuNjk5MjE5IDkxLjQwMDM5MSA0My41MDAzOTEgOTEuNDAwMzkxIDYyLjkwMDM5MSBDIDkxLjQwMDM5MSA4Mi4zMDAzOTEgNzUuNzk5NjA5IDk4IDU2LjU5OTYwOSA5OCBDIDM3LjM5OTYwOSA5OCAyMS44MDA3ODEgODIuMzAwMzkxIDIxLjgwMDc4MSA2Mi45MDAzOTEgQyAyMS44MDA3ODEgNDMuNTAwMzkxIDM3LjM5OTYwOSAyNy42OTkyMTkgNTYuNTk5NjA5IDI3LjY5OTIxOSB6IE0gNTYuNjk5MjE5IDQwLjE5OTIxOSBDIDQ3LjE5OTIxOSA0MC4xOTkyMTkgMzguNyA0Ni4zMDA3ODEgMzUuNSA1NS4zMDA3ODEgQyAzNSA1Ni42MDA3ODEgMzUuNjk5NjA5IDU4LjE5OTYwOSAzNy4wOTk2MDkgNTguNTk5NjA5IEMgMzcuMzk5NjA5IDU4LjY5OTYwOSAzNy43IDU4LjgwMDc4MSAzOCA1OC44MDA3ODEgQyAzOS4xIDU4LjgwMDc4MSA0MC4xIDU4LjEgNDAuNSA1NyBDIDQyLjkgNTAuMSA0OS40OTkyMTkgNDUuNDAwMzkxIDU2LjY5OTIxOSA0NS40MDAzOTEgQyA1OC4wOTkyMTkgNDUuNDAwMzkxIDU5LjMwMDc4MSA0NC4yMDA3ODEgNTkuMzAwNzgxIDQyLjgwMDc4MSBDIDU5LjMwMDc4MSA0MS40MDA3ODEgNTguMDk5MjE5IDQwLjE5OTIxOSA1Ni42OTkyMTkgNDAuMTk5MjE5IHogTSAzNy42OTkyMTkgNjQuOTAwMzkxIEMgMzYuMjk5MjE5IDY0LjkwMDM5MSAzNS4wOTk2MDkgNjYgMzUuMDk5NjA5IDY3LjUgTCAzNS4wOTk2MDkgNjcuOTAwMzkxIEMgMzUuMTk5NjA5IDY5LjMwMDM5MSAzNi4zMDA3ODEgNzAuNSAzNy44MDA3ODEgNzAuNSBDIDM5LjIwMDc4MSA3MC41IDQwLjQwMDM5MSA2OS4zMDAzOTEgNDAuNDAwMzkxIDY3LjkwMDM5MSBMIDQwLjQwMDM5MSA2Ny41OTk2MDkgQyA0MC40MDAzOTEgNjYuMDk5NjA5IDM5LjMwMDc4MSA2NC45MDAzOTEgMzcuODAwNzgxIDY0LjkwMDM5MSBMIDM3LjY5OTIxOSA2NC45MDAzOTEgeiBNIDkzLjgwMDc4MSA5Ni41OTk2MDkgTCAxMDcuNTk5NjEgMTEwLjU5OTYxIEwgMTAzLjgwMDc4IDExNC40MDAzOSBMIDkwIDEwMC40MDAzOSBMIDkzLjgwMDc4MSA5Ni41OTk2MDkgeiIvPjwvc3ZnPg=="/>
                    </div>
                    <ul className="card-container">
                        {filteredDestinations.map(destination => (
                            <li key={destination.id} className="card" onClick={() => openModal(destination)}>
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
        </>
    );
};

export default TravelDestination;