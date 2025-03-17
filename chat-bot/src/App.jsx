import React, {lazy, Suspense} from 'react';
import {BrowserRouter as Router, Routes, Route, Outlet} from 'react-router-dom';
import { ChatProvider } from './context/UseContext.jsx';
import Header from './components/Header';
import IntroSection from './components/IntroSection';
import Background from './components/Background';
import Modal from "./components/Modal.jsx";
import PlanSelection from "./pages/PlanSelection.jsx";



    //laze : 컴포넌트를 동적으로 로드 => 필요할때만 호출. Suspense로 감싸지않으면 오류
    const PeopleCount = lazy(() => import('./pages/PeopleCount'));
    const RegionSelection = lazy(() => import('./pages/RegionSelection'));
    const RandomPlanStep = lazy(() => import('./pages/RandomPlanStep'));
    const CustomizedPlanStep = lazy(() => import('./pages/CustomizedPlanStep'));
    const ChatScreen = lazy(() => import('./pages/ChatScreen'));

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
                <Header />
                <main>
                    <IntroSection />
                    <Routes>
                        <Route path="/" element={<PlanSelection />} />
                        <Route path="plan-selection" element={<PlanSelection />} />
                        <Route path="" element={<ModalRoute />}>
                            <Route path="people-count" element={
                                <Suspense fallback={<div>Loading...</div>}>
                                    <PeopleCount />
                                </Suspense>
                            } />
                            <Route path="region-selection" element={
                                <Suspense fallback={<div>Loading...</div>}>
                                    <RegionSelection />
                                </Suspense>
                            } />
                            <Route path="plan-details/random" element={
                                <Suspense fallback={<div>Loading...</div>}>
                                    <RandomPlanStep />
                                </Suspense>
                            } />
                            <Route path="plan-details/custom" element={
                                <Suspense fallback={<div>Loading...</div>}>
                                    <CustomizedPlanStep />
                                </Suspense>
                            } />
                            <Route path="chat" element={
                                <Suspense fallback={<div>Loading...</div>}>
                                    <ChatScreen />
                                </Suspense>
                            } />
                        </Route>
                    </Routes>
                    <Background />
                </main>
                <footer></footer>
            </Router>
        </ChatProvider>
    );
};

export default App;

