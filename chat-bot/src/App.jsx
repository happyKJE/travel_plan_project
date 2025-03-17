import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import { ChatProvider } from "./context/UseContext.jsx";
import Header from "./components/Header";
import IntroSection from "./components/IntroSection";
import Background from "./components/Background";
import Modal from "./components/Modal.jsx";
import PeopleCount from "./pages/PeopleCount";
import RandomPlanStep from "./pages/RandomPlanStep";
import CustomizedPlanStep from "./pages/CustomizedPlanStep";
import ChatScreen from "./pages/ChatScreen";
import PlanSelection from "./pages/PlanSelection.jsx";
import RegionSelection from "./pages/RegionSelection";
import DatesSelection from "./pages/DatesSelection";
// 📌 여행 후기 게시판 컴포넌트 추가
import TravelReviews from "./pages/TravelReviews";
import TravelReviewDetail from "./pages/TravelReviewDetail";

const App = () => {
  const [showReviews, setShowReviews] = useState(false); // 📌 여행 후기 모달 상태

  const ModalRoute = () => {
    return (
      <div>
        <Modal>
          <Outlet /> {/* 여기서 선택페이지 렌더링 */}
        </Modal>
      </div>
    );
  };

  return (
    <ChatProvider>
      <Router>
        <Header onShowReviews={() => setShowReviews(true)} />

        <main>
          <IntroSection />
          <Routes>
            <Route path="/" element={<PlanSelection />} />
            <Route path="plan-selection" element={<PlanSelection />} />
            <Route path="" element={<ModalRoute />}>
              <Route path="people-count" element={<PeopleCount />} />
              <Route path="dates-selection" element={<DatesSelection />} />
              <Route path="region-selection" element={<RegionSelection />} />
              <Route path="plan-details/random" element={<RandomPlanStep />} />
              <Route
                path="plan-details/custom"
                element={<CustomizedPlanStep />}
              />
              <Route path="chat" element={<ChatScreen />} />
            </Route>
            {/* 📌 여행 후기 상세 라우트 */}
            <Route
              path="board/review/:reviewId"
              element={<TravelReviewDetail />}
            />
          </Routes>
          <Background />

          {/* 📌 여행 후기 모달 (오버레이) */}
          {showReviews && (
            <TravelReviews onClose={() => setShowReviews(false)} />
          )}
        </main>

        <footer></footer>
      </Router>
    </ChatProvider>
  );
};

export default App;
