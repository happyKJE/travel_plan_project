import React, {lazy, Suspense} from "react";
import {BrowserRouter as Router, Routes, Route, Outlet} from "react-router-dom";
import { ChatProvider } from "./context/UseContext.jsx";
import Header from "./components/Header";
import IntroSection from "./components/IntroSection";
import Background from "./components/Background";
import TravelDestination from "./pages/TravelDestination";
import Modal from "./components/Modal.jsx";
import PlanSelection from "./pages/PlanSelection.jsx";
import ReloadHandler from "./components/ReloadHandler.jsx";

//laze : 컴포넌트를 동적으로 로드 => 필요할때만 호출. Suspense로 감싸지않으면 오류
const PeopleCount = lazy(() => import("./pages/PeopleCount"));
const DatesSelection = lazy(() => import("./pages/DatesSelection.jsx"));
const RegionSelection = lazy(() => import("./pages/RegionSelection"));
const RandomPlanStep = lazy(() => import("./pages/RandomPlanStep"));
const CustomizedPlanStep = lazy(() => import("./pages/CustomizedPlanStep"));
const ChatScreen = lazy(() => import("./pages/ChatScreen"));
const SavingChat = lazy(() => import("./pages/SavingChat"));
const TravelReviews = lazy(() => import("./pages/TravelReviews"));
const TravelReviewDetail = lazy(() => import("./pages/TravelReviewDetail"));
const ReviewArea = lazy(() => import("./pages/reviewArea"));

const App = () => {
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
                <ReloadHandler />
                <Header/>
                <main>
                    <IntroSection />
                    <Suspense fallback={<div>Loading...</div>}>
                        <Routes>
                            <Route path="/" element={<PlanSelection />} />
                            <Route path="plan-selection" element={<PlanSelection />} />

                            <Route path="" element={<ModalRoute />}>
                                <Route path="people-count" element={<PeopleCount />} />
                                <Route path="dates-selection" element={<DatesSelection />} />
                                <Route path="region-selection" element={<RegionSelection />} />
                                <Route path="plan-details/random" element={<RandomPlanStep />} />
                                <Route path="plan-details/custom" element={<CustomizedPlanStep />} />
                                <Route path="chat" element={<ChatScreen />} />
                                <Route path="saving" element={<SavingChat />} />
                                <Route path="travelReviews" element={<TravelReviews />} />
                                <Route path="review/:reviewId" element={<TravelReviewDetail />} />
                                <Route path="reviewArea" element={<ReviewArea />} />
                            </Route>
                        </Routes>
                    </Suspense>
                    <Background />
                    <TravelDestination />
                </main>
                <footer></footer>
            </Router>
        </ChatProvider>
    );
};

export default App;

