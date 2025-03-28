import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";
import { ChatProvider } from "./context/UseContext.jsx";
import MainLayout from "./layout/MainLayout";
import NoIntroLayout from "./layout/NoIntroLayout";
import Header from "./components/Header";
import ReloadHandler from "./components/ReloadHandler.jsx";
import { ModalProvider } from "./components/ModalProvider.jsx";
import Footer from "./components/Footer.jsx";
import Modal from "./components/Modal.jsx";
import Background from "./components/Background.jsx";

// Lazy-loaded 컴포넌트들
const PlanSelection = lazy(() => import("./pages/PlanSelection.jsx"));
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
const Login = lazy(() => import("./pages/Login"));
const Join = lazy(() => import("./pages/Register.jsx"));
const MyPage = lazy(() => import("./pages/MyPage.jsx"));
const MyPlanDetail = lazy(() => import("./pages/MyPlanDetail.jsx"));
const TravelDestination = lazy(() => import("./pages/TravelDestination.jsx"));

// Layout 컴포넌트


// 모달용 라우트 컴포넌트
const ModalRoute = () => {
    return (
        <div>
            <Modal>
                <Outlet /> {/* 모달 내부에 렌더링될 컴포넌트 */}
            </Modal>
        </div>
    );
};


const App = () => {
    return (
        <Suspense>
            <ChatProvider>
                <Router>
                    <ReloadHandler />
                    <ModalProvider>
                        <Header />
                        <main>
                                <Routes>
                                    {/* IntroSection이 포함된 라우트 */}
                                    <Route element={<MainLayout />}>
                                        <Route path="/" element={<PlanSelection />} />
                                        <Route path="plan-selection" element={<PlanSelection />} />
    
                                        {/* 모달용 경로 (예: people-count, dates-selection 등) */}
                                        <Route element={<ModalRoute />}>
                                            <Route path="people-count" element={<PeopleCount />} />
                                            <Route path="dates-selection" element={<DatesSelection />} />
                                            <Route path="region-selection" element={<RegionSelection />} />
                                            <Route path="plan-details/random" element={<RandomPlanStep />} />
                                            <Route path="plan-details/custom" element={<CustomizedPlanStep />} />
                                            <Route path="chat" element={<ChatScreen />} />
                                            <Route path="saving" element={<SavingChat />} />
                                            <Route path="travelReviews" element={<TravelReviews />} />
                                            <Route path="review/:id" element={<TravelReviewDetail />} />
                                            <Route path="reviewArea" element={<ReviewArea />} />
                                        </Route>
                                    </Route>
    
                                    {/* IntroSection이 없는 라우트 */}
                                    <Route element={<NoIntroLayout />}>
                                        <Route path="login" element={<Login />} />
                                        <Route path="join" element={<Join />} />
                                        <Route path="mypage" element={<MyPage />}>
                                            <Route path="plan/:id" element={
                                                <Modal>
                                                    <MyPlanDetail />
                                                </Modal>
                                            } />
                                        </Route>
                                    </Route>
                                </Routes>
                                <Background />
                                <TravelDestination />
                        </main>
                        <Footer />
                    </ModalProvider>
                </Router>
            </ChatProvider>
        </Suspense>
            
    );
};

export default App;

