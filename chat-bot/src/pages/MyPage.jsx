import React, {useState, useEffect} from 'react';
import '../styles/MyPage.css'
import MyInfo from "./MyInfo.jsx";
import MyTravelPlans from "./MyTravelPlans.jsx";

const MyPage = () => {
  const [activeTab, setActiveTab] = useState('info');
  const [userInfo, setUserInfo] = useState(null);
  const [myPlans, setMyPlans] = useState([]);

  const token = localStorage.getItem('token');

  // ✅ 내 정보 + 일정 가져오기
    useEffect(() => {
    const fetchMyPage = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/api/users/mypage`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await res.json();
        setUserInfo(data.userInfo);
        setMyPlans(data.plans);
      } catch (err) {
        console.error('마이페이지 불러오기 실패:', err);
      }
    };
    fetchMyPage();
  }, []);



  return (
    <div className="mypage-container">
      <h2>마이페이지</h2>

      <ul className="mypage-nav">
        <li
            className={activeTab === 'info' ? 'active' : ''}
            onClick={() => setActiveTab('info')}
        >
          내 정보
        </li>
        <li
            className={activeTab === 'plans' ? 'active' : ''}
            onClick={() => setActiveTab('plans')}
        >
          나의 여행 일정
        </li>
      </ul>

      <div className="mypage-content">
        {activeTab === 'info' && userInfo && <MyInfo userInfo={userInfo} setUserInfo={setUserInfo} />}
        {activeTab === 'plans' && myPlans && <MyTravelPlans myPlans={myPlans} />}
      </div>
    </div>
  );
};

export default MyPage;
