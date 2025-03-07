import {Route, Routes} from "react-router-dom";
import ChatBotApp from "./Component/ChatBotApp.jsx";
import ChatBotStart from "./Component/ChatBotStart.jsx";

export default function RouterComponent () {
    return (
        <Routes>
            <Route path="/" element={<ChatBotStart />}></Route>
            <Route path="/ChatBotApp" element={<ChatBotApp />}></Route>
        </Routes>
    )
}
