import React from 'react';
import {BrowserRouter as Router, Routes, Route, Outlet} from 'react-router-dom';
import { ChatProvider } from './context/UseContext.jsx';
import Header from './components/Header';
import IntroSection from './components/IntroSection';
import Background from './components/Background';
import PlanSelection from './pages/PlanSelection';
import PeopleCount from './pages/PeopleCount';
import RandomPlanStep from './pages/RandomPlanStep';
import CustomizedPlanStep from './pages/CustomizedPlanStep';
import ChatScreen from './pages/ChatScreen';
import Modal from "./components/Modal.jsx";
import IntroButton from "./components/IntroButton.jsx";

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
                        <Route path="/" element={<IntroButton />} />
                        <Route path="plan-selection" element={<PlanSelection />} />
                        <Route path="" element={<ModalRoute />}>
                            <Route path="people-count" element={<PeopleCount />} />
                            <Route path="plan-details/random" element={<RandomPlanStep />} />
                            <Route path="plan-details/custom" element={<CustomizedPlanStep />} />
                            <Route path="chat" element={<ChatScreen />} />
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

